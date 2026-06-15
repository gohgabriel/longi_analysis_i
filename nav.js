/* nav.js — loads toc.json and injects the top nav bar + prev/next footer.
   Each page just needs:
     <script src="nav.js" data-page="chapter-id-here"></script>
   The data-page attribute must match the "id" field in toc.json. */

(function () {
  const script = document.currentScript;
  const pageId = script ? script.getAttribute('data-page') : null;

  // Resolve path to toc.json relative to this script's location
  const scriptSrc = script ? script.src : '';
  const base = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
  const tocUrl = base + 'toc.json';

  fetch(tocUrl)
    .then(r => r.json())
    .then(toc => {
      buildNav(toc, pageId);
      buildChapterFooter(toc, pageId);
    })
    .catch(() => {
      // Silently fail — nav just won't render if toc.json is missing
    });

  function buildNav(toc, activeId) {
    const nav = document.createElement('nav');
    nav.id = 'site-nav';

    const brand = document.createElement('a');
    brand.className = 'nav-brand';
    brand.href = base + 'index.html';
    brand.textContent = toc.course;
    nav.appendChild(brand);

    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    toc.chapters.forEach(ch => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      // Resolve href relative to toc base, then make it relative to current page
      a.href = resolveHref(ch.file, base);
      a.textContent = ch.title;
      if (ch.id === activeId) a.className = 'active';
      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);

    // Insert before first child of body
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function buildChapterFooter(toc, activeId) {
    const chapters = toc.chapters.filter(c => c.type !== 'index');
    const idx = chapters.findIndex(c => c.id === activeId);
    if (idx === -1) return;

    const prev = idx > 0 ? chapters[idx - 1] : null;
    const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
    if (!prev && !next) return;

    const footer = document.createElement('div');
    footer.className = 'chapter-nav';

    if (prev) {
      const a = document.createElement('a');
      a.href = resolveHref(prev.file, base);
      a.className = 'prev';
      a.innerHTML = `<span class="cn-label">← Previous</span><span class="cn-title">${prev.title}</span>`;
      footer.appendChild(a);
    } else {
      footer.appendChild(document.createElement('span'));
    }

    if (next) {
      const a = document.createElement('a');
      a.href = resolveHref(next.file, base);
      a.className = 'next';
      a.innerHTML = `<span class="cn-label">Next →</span><span class="cn-title">${next.title}</span>`;
      footer.appendChild(a);
    }

    // Append to .card if present, otherwise to body
    const card = document.querySelector('.card');
    if (card) card.appendChild(footer);
    else document.body.appendChild(footer);
  }

  function resolveHref(file, base) {
    // If the current page is in a subdirectory, paths from toc need to go up
    const currentPath = window.location.pathname;
    const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    const tocDir = new URL(base, window.location.href).pathname;

    // Count how many directories up we need to go from current page to toc root
    const rel = getRelativePath(currentDir, tocDir);
    return rel + file;
  }

  function getRelativePath(fromDir, toDir) {
    const from = fromDir.replace(/\/$/, '').split('/');
    const to = toDir.replace(/\/$/, '').split('/');

    // Find common prefix
    let i = 0;
    while (i < from.length && i < to.length && from[i] === to[i]) i++;

    const ups = from.length - i;
    const downs = to.slice(i);
    return '../'.repeat(ups) + (downs.length ? downs.join('/') + '/' : '');
  }
})();
