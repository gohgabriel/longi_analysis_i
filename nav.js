/* nav.js — builds sidebar nav + mobile hamburger from toc.json.
   Each page needs:
     <script src="nav.js" data-page="chapter-id"></script>
   placed as the first child of <body>, before .site-layout. */

(function () {
  const script   = document.currentScript;
  const pageId   = script ? script.getAttribute('data-page') : null;
  const base     = script ? script.src.substring(0, script.src.lastIndexOf('/') + 1) : '';
  const tocUrl   = base + 'toc.json';

  fetch(tocUrl)
    .then(r => r.json())
    .then(toc => {
      wrapBody(toc, pageId);
      buildSidebar(toc, pageId, document.getElementById('site-nav'));
      buildSidebar(toc, pageId, document.getElementById('nav-overlay-panel'));
      buildChapterFooter(toc, pageId);
    })
    .catch(() => {});

  /* ── Wrap existing body content in .site-layout ── */
  function wrapBody(toc, pageId) {
    // Build mobile bar
    const mobileBar = document.createElement('div');
    mobileBar.id = 'mobile-bar';
    mobileBar.innerHTML = `
      <button id="hamburger" aria-label="Open navigation">&#9776;</button>
      <a class="mob-brand" href="${base}index.html">${toc.course}</a>
    `;

    // Build overlay (for mobile)
    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.innerHTML = `
      <div id="nav-overlay-backdrop"></div>
      <div id="nav-overlay-panel"></div>
    `;

    // Build sidebar shell
    const sidebar = document.createElement('nav');
    sidebar.id = 'site-nav';

    // Build layout wrapper
    const layout = document.createElement('div');
    layout.className = 'site-layout';

    // Move all current body children into layout
    while (document.body.firstChild) {
      layout.appendChild(document.body.firstChild);
    }

    // Prepend sidebar into layout
    layout.insertBefore(sidebar, layout.firstChild);

    // Assemble: mobileBar + overlay + layout
    document.body.appendChild(mobileBar);
    document.body.appendChild(overlay);
    document.body.appendChild(layout);

    // Inject #notes-col into .card and move margin-note asides into it
    const card = document.querySelector('.card');
    if (card) {
      const notesCol = document.createElement('div');
      notesCol.id = 'notes-col';
      card.appendChild(notesCol);

      card.querySelectorAll('aside.margin-note').forEach(note => {
        notesCol.appendChild(note);
      });

      // Position notes — rAF ensures layout is painted, 500ms covers KaTeX reflow
      requestAnimationFrame(() => {
        positionNotes(notesCol);
        setTimeout(() => positionNotes(notesCol), 500);
      });
    }

    // Hamburger toggle
    document.getElementById('hamburger').addEventListener('click', () => {
      overlay.classList.add('open');
    });
    document.getElementById('nav-overlay-backdrop').addEventListener('click', () => {
      overlay.classList.remove('open');
    });
  }

  /* ── Build nav links into a given container ── */
  function buildSidebar(toc, activeId, container) {
    if (!container) return;

    const brand = document.createElement('a');
    brand.className = 'nav-brand';
    brand.href = resolveHref('index.html');
    brand.textContent = toc.course;
    container.appendChild(brand);

    // Flat list of all chapters for prev/next (stored on window for footer)
    const allChapters = toc.sections.flatMap(s => s.chapters);
    window.__tocChapters = allChapters;

    toc.sections.forEach(section => {
      const sec = document.createElement('div');
      sec.className = 'nav-section';

      const secTitle = document.createElement('div');
      secTitle.className = 'nav-section-title';
      secTitle.textContent = section.title;
      sec.appendChild(secTitle);

      const ul = document.createElement('ul');
      ul.className = 'nav-links';

      section.chapters.forEach(ch => {
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href        = resolveHref(ch.file);
        a.textContent = ch.title;
        if (ch.id === activeId)   a.className = 'active';
        if (ch.status === 'draft') a.classList.add('draft');
        li.appendChild(a);
        ul.appendChild(li);
      });

      sec.appendChild(ul);
      container.appendChild(sec);
    });
  }

  /* ── Prev / Next footer ── */
  function buildChapterFooter(toc, activeId) {
    const chapters = toc.sections.flatMap(s => s.chapters);
    const idx = chapters.findIndex(c => c.id === activeId);
    if (idx === -1) return;

    const prev = idx > 0               ? chapters[idx - 1] : null;
    const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
    if (!prev && !next) return;

    const footer = document.createElement('div');
    footer.className = 'chapter-nav';

    if (prev) {
      const a = document.createElement('a');
      a.href = resolveHref(prev.file);
      a.className = 'prev';
      a.innerHTML = `<span class="cn-label">← Previous</span><span class="cn-title">${prev.title}</span>`;
      footer.appendChild(a);
    } else {
      footer.appendChild(document.createElement('span'));
    }

    if (next) {
      const a = document.createElement('a');
      a.href = resolveHref(next.file);
      a.className = 'next';
      a.innerHTML = `<span class="cn-label">Next →</span><span class="cn-title">${next.title}</span>`;
      footer.appendChild(a);
    }

    const card = document.querySelector('.card');
    if (card) card.appendChild(footer);
    else document.body.appendChild(footer);
  }

  /* ── Align margin notes to their anchors in the prose ── */
  function positionNotes(notesCol) {
    if (!notesCol) return;
    const notes = Array.from(notesCol.querySelectorAll('.margin-note[data-ref]'));
    if (!notes.length) return;

    // #notes-col is position:absolute inside .card — its offsetTop is the card's padding-top
    const cardTop = notesCol.offsetParent
      ? notesCol.offsetParent.getBoundingClientRect().top + window.scrollY
      : notesCol.getBoundingClientRect().top + window.scrollY;

    const minGap = 16;
    let nextAvailable = 0;

    notes.forEach(note => {
      const anchor = document.getElementById(note.dataset.ref);
      if (!anchor) return;
      const anchorTop = anchor.getBoundingClientRect().top + window.scrollY - cardTop;
      const top = Math.max(anchorTop, nextAvailable);
      note.style.top = top + 'px';
      nextAvailable = top + note.offsetHeight + minGap;
    });
  }

  /* ── Resolve a toc-relative href to be relative to the current page ── */
  function resolveHref(file) {
    const currentDir = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const tocDir     = new URL(base, window.location.href).pathname;
    return getRelativePath(currentDir, tocDir) + file;
  }

  function getRelativePath(fromDir, toDir) {
    const from = fromDir.replace(/\/$/, '').split('/');
    const to   = toDir.replace(/\/$/, '').split('/');
    let i = 0;
    while (i < from.length && i < to.length && from[i] === to[i]) i++;
    const ups   = from.length - i;
    const downs = to.slice(i);
    return '../'.repeat(ups) + (downs.length ? downs.join('/') + '/' : '');
  }
})();
