# Authoring Guide — Longitudinal Data Analysis Course

This document describes how to create new `.html` chapter files that are consistent with the existing course design. All styling comes from `style.css`. This guide covers every component you will need.

---

## Page skeleton

Every page follows this exact structure. Copy this shell and fill in the gaps.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X.X Chapter Title — Longitudinal Data Analysis</title>
  <link rel="stylesheet" href="style.css">

  <!-- KaTeX (include only if the page has maths) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$',  right: '$',  display: false}
      ]
    });">
  </script>

  <!-- Lucide icons (always include) -->
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.395.0/dist/umd/lucide.min.js" defer
    onload="lucide.createIcons()"></script>
</head>
<body>

  <!-- nav.js injects the left sidebar. data-page must match the chapter id in toc.json -->
  <script src="nav.js" data-page="ch01_2_apces"></script>

  <div class="page-body">
    <div class="card">

      <h1>X.X Chapter Title</h1>
      <p class="subtitle">A short descriptive subtitle</p>

      <!-- margin notes go here, before the prose (nav.js positions them) -->

      <!-- learning objectives go here -->

      <!-- prose and content go here -->

    </div><!-- /.card -->
  </div><!-- /.page-body -->

</body>
</html>
```

**Rules:**
- `data-page` must exactly match the chapter's `id` field in `toc.json`.
- KaTeX on **pure prose pages** (no widget JS): use `renderMathInElement(document.body, ...)`.
- KaTeX on **widget pages** (has JS with `$` signs): scope to `.prose` only to avoid breaking JS:
  ```js
  onload="document.querySelectorAll('.prose').forEach(el => renderMathInElement(el, {...}))"
  ```

---

## Learning objectives

Always the first block inside `.card`, after `h1` and `p.subtitle`.

```html
<div class="objectives">
  <div class="objectives-icon"><i data-lucide="target"></i></div>
  <div class="objectives-body">
    <div class="obj-label">Learning objectives</div>
    <ul>
      <li>First objective</li>
      <li>Second objective</li>
      <li>Third objective</li>
    </ul>
  </div>
</div>
```

---

## Prose text

Wrap all running text in a `div.prose`. This applies correct font size, line height, and spacing. **Do not** use a background colour here — prose is plain white, not a bubble.

```html
<div class="prose">
  <p>Paragraph text goes here. Supports <strong>bold</strong>, <em>italic</em>,
  and inline <code>code</code>.</p>

  <h2>Section heading</h2>
  <p>Text under the heading.</p>

  <h3>Sub-heading</h3>
  <p>More text.</p>

  <ul>
    <li><strong>Term</strong> — definition or explanation</li>
    <li>Another item</li>
  </ul>

  <blockquote>
    A pull quote or research question.
  </blockquote>

  <hr>

  <p>After a horizontal rule.</p>
</div>
```

**Available inline elements inside `.prose`:**
| Element | Use |
|---|---|
| `<strong>` | Bold / key terms |
| `<em>` | Italics |
| `<code>` | Inline code, variable names |
| `<a href="...">` | Links (styled blue) |
| `<blockquote>` | Pull quotes, RQs |
| `<hr>` | Section divider |

---

## Maths (KaTeX)

Write LaTeX directly in the HTML. KaTeX renders it automatically on page load.

```html
<!-- Display (block) equation -->
$$y = \beta_0 + \beta_1 \cdot \text{time} + \epsilon$$

<!-- Inline equation -->
<p>The parameter $\theta_{\text{true}}$ is never directly observable.</p>
```

Displayed equations go **outside** `<p>` tags, directly inside `.prose`.

---

## Callout boxes

Use callouts to highlight key points, warnings, or formal definitions. Choose a colour that matches the tone.

```html
<div class="callout blue">
  <div class="callout-icon"><i data-lucide="info"></i></div>
  <div class="callout-body">
    <div class="callout-title">Formally</div>
    The body text of the callout goes here.
  </div>
</div>

<div class="callout amber">
  <div class="callout-icon"><i data-lucide="triangle-alert"></i></div>
  <div class="callout-body">
    <div class="callout-title">Watch out</div>
    A warning about a common mistake or important caveat.
  </div>
</div>

<div class="callout green">
  <div class="callout-icon"><i data-lucide="check-circle"></i></div>
  <div class="callout-body">
    <div class="callout-title">Key result</div>
    A theorem, result, or takeaway worth highlighting.
  </div>
</div>
```

**Colour options:** `blue`, `green`, `amber`, `purple`

**Recommended Lucide icons by tone:**
| Tone | Icon |
|---|---|
| Information / formal | `info` |
| Warning / caveat | `triangle-alert` |
| Result / theorem | `check-circle` |
| Tip / intuition | `lightbulb` |
| Coming up / preview | `arrow-right` |

---

## Margin notes

Margin notes appear in the right portion of the card, aligned to specific points in the prose. They are defined **before** the prose (near the top of `.card`), and linked to anchor `<span>`s placed inline in the text. `nav.js` reads the anchors and positions the notes automatically.

### Step 1 — declare the note (before `.prose`)

```html
<aside class="margin-note blue" data-ref="ref-my-note">
  <span class="note-label">Notation</span>
  The body of the margin note. Keep it short — 2–4 sentences.
  Supports <strong>bold</strong> and <em>italics</em>.
</aside>
```

**Colour options:** (none = default grey), `blue`, `green`, `amber`, `purple`

**`note-label` suggestions:** `Notation`, `Key concept`, `Remember`, `ML connection`, `Coming up`, `Formally`, `Intuition`

### Step 2 — place the anchor (inside `.prose`)

Put a `<span id="ref-my-note"></span>` at the exact sentence where the note should align:

```html
<p>
  <span id="ref-my-note"></span>What we are actually saying is that, in the
  general population, there is some ground truth $\theta_{\text{true}}$.
</p>
```

The `id` on the span must match the `data-ref` on the aside exactly.

### Notes on positioning

- Notes are stacked top-to-bottom in the order they appear in the HTML.
- If two notes would overlap, the lower one is pushed down automatically.
- The card is wide enough to show notes alongside prose on screens ≥ 1100px. Below that width, notes are hidden.
- Keep the total number of notes per page to around 4–6. More than that gets crowded.

---

## Summary table

Use for structured comparisons (e.g. APCES applied to a method).

```html
<div style="overflow-x:auto; margin-bottom:1rem;">
  <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
    <thead>
      <tr style="border-bottom:2px solid var(--border-strong);">
        <th style="text-align:left; padding:0.6rem 0.75rem; color:var(--text-muted); font-weight:700;">Column A</th>
        <th style="text-align:left; padding:0.6rem 0.75rem; color:var(--text-muted); font-weight:700;">Column B</th>
        <th style="text-align:left; padding:0.6rem 0.75rem; color:var(--text-muted); font-weight:700;">Column C</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--border);">
        <td style="padding:0.65rem 0.75rem; font-weight:600; color:var(--blue-text);">Row label</td>
        <td style="padding:0.65rem 0.75rem; color:var(--text-muted);">Cell content</td>
        <td style="padding:0.65rem 0.75rem; color:var(--text-muted);">Cell content</td>
      </tr>
      <tr style="border-bottom:1px solid var(--border); background:var(--surface-2);">
        <td style="padding:0.65rem 0.75rem; font-weight:600; color:var(--blue-text);">Row label</td>
        <td style="padding:0.65rem 0.75rem; color:var(--text-muted);">Cell content</td>
        <td style="padding:0.65rem 0.75rem; color:var(--text-muted);">Cell content</td>
      </tr>
    </tbody>
  </table>
</div>
```

Alternate rows use `background:var(--surface-2)` for zebra striping.

---

## Explainer box (widget pages only)

The `.explainer` is a light-grey background box used **only inside interactive widget pages** to display the per-step explanatory text that is injected by JavaScript. It is **not** for prose chapters — use `.prose` there instead.

```html
<!-- Static version (rare — usually JS-injected) -->
<div class="explainer">
  <h3>Step title</h3>
  <p>Explanation text.</p>
  <span class="key">A key takeaway sentence highlighted at the bottom.</span>
  <span class="footnote"><span class="fn">*</span> A footnote if needed.</span>
</div>
```

---

## Formula row (Bayesian page pattern)

A centred display row showing a colour-coded equation in plain text (not KaTeX). Used for Bayes' theorem overview.

```html
<div class="formula-row">
  <span class="f-post">p(θ | data)</span>
  <span class="f-op">∝</span>
  <span class="f-like">p(data | θ)</span>
  <span class="f-op">×</span>
  <span class="f-prior">p(θ)</span>
</div>
```

Colour classes: `f-post` (green), `f-like` (blue), `f-prior` (yellow), `f-op` (muted).

---

## Stepper + explainer (widget pages only)

Widget pages use a numbered stepper to walk through concepts. Each step injects its content into `#explainer` via JS. All text lives in a `STAGE_TEXT` object — no static HTML panel per step.

```html
<!-- HTML: stepper buttons + empty explainer target -->
<div class="stepper">
  <button class="step active" id="step-1" onclick="setStage(1)"><span class="step-num">1</span>Step one<br>label</button>
  <button class="step"        id="step-2" onclick="setStage(2)"><span class="step-num">2</span>Step two<br>label</button>
  <button class="step"        id="step-3" onclick="setStage(3)"><span class="step-num">3</span>Step three<br>label</button>
</div>
<div class="explainer" id="explainer"></div>
```

```js
// JS: content object + render function
const STAGE_TEXT = {
  1: {
    h: "1 &middot; Step one heading",
    body: "Body text for step one. Supports <strong>bold</strong>, <em>italics</em>, and inline HTML.",
    key: "Optional key takeaway shown highlighted at the bottom.",        // omit if not needed
    footnote: "<span class=\"fn\">*</span> Optional footnote text."      // omit if not needed
  },
  2: {
    h: "2 &middot; Step two heading",
    body: "Body text for step two.",
    key: "Key takeaway for step two."
  },
  3: {
    h: "3 &middot; Step three heading",
    body: "Body text for step three."
  }
};

let stage = 1;

function refreshExplainer() {
  const t = STAGE_TEXT[stage];
  let html = "<h3>" + t.h + "</h3><div>" + t.body + "</div>";
  if (t.key)      html += "<span class=\"key\">" + t.key + "</span>";
  if (t.footnote) html += "<span class=\"footnote\">" + t.footnote + "</span>";
  document.getElementById("explainer").innerHTML = html;
}

function setStage(s) {
  stage = s;
  [1,2,3].forEach(i => document.getElementById("step-"+i).classList.toggle("active", i === s));
  refreshExplainer();
}

// Call in init:
setStage(1);
```

**Notes:**
- `key` renders as a highlighted callout line at the bottom of the explainer.
- `footnote` renders in smaller text below the key. Use `<span class="fn">*</span>` for footnote markers.
- The `h3` inside `.explainer` does NOT get the blue h2 accent bar (suppressed in `style.css`).
- All content is HTML strings — escape quotes with `\"` inside the JS template literals.

---

## Charts (Canvas)

Interactive charts use a `<canvas>` inside `.chart-wrap`. All drawing is done in JS.

```html
<div class="legend" id="legend">
  <span><span class="dot" style="background:#378ADD;"></span>Label A</span>
  <span><span class="dot" style="background:#1D9E75;"></span>Label B</span>
</div>

<div class="chart-wrap">
  <canvas id="chart" role="img" aria-label="Description of the chart"></canvas>
</div>
```

The `.chart-wrap` is `height: 280px` by default. The canvas fills it automatically via the `resize()` pattern used in both visualiser pages.

---

## Stat chips

Small summary statistics displayed in a row above or below the chart.

```html
<div class="stats">
  <div class="stat">
    <div class="stat-label">p-value</div>
    <div class="stat-value" id="pval">—</div>
  </div>
  <div class="stat">
    <div class="stat-label">95% CI</div>
    <div class="stat-value small" id="ci">—</div>
  </div>
</div>
```

Use `stat-value small` for longer strings (e.g. interval notation) that need smaller text.

---

## Slider controls

```html
<div class="section-label">Parameters</div>
<div class="controls">
  <div class="ctrl">
    <label>Label text</label>
    <input type="range" min="0" max="10" step="0.1" value="5" id="my-slider">
    <span class="val" id="my-slider-out">5</span>
  </div>
</div>
```

Wire up in JS:
```js
document.getElementById('my-slider').addEventListener('input', e => {
  myValue = parseFloat(e.target.value);
  document.getElementById('my-slider-out').textContent = myValue.toFixed(1);
  update();
});
```

---

## Toggle buttons

```html
<div class="toggle-row">
  <button class="tog active-blue" id="btn-a" onclick="toggleA()">Option A</button>
  <button class="tog"             id="btn-b" onclick="toggleB()">Option B</button>
</div>
```

Active colour classes: `active-blue`, `active-green`, `active-red`, `active-purple`, `active-amber`, `active-yellow`.

Toggle pattern in JS:
```js
let showA = true;
function toggleA() {
  showA = !showA;
  document.getElementById('btn-a').className = 'tog' + (showA ? ' active-blue' : '');
  update();
}
```

---

## Case study links

Add at the bottom of a chapter card to link out to R case studies.

```html
<div class="case-studies">
  <div class="cs-label">Case studies</div>
  <a href="case_study/my_case_study.html">Case Study 1: Title here</a>
  <a href="case_study/another_case_study.html">Case Study 2: Title here</a>
</div>
```

---

## Adding a chapter to `toc.json`

Every new page must be registered in `toc.json` for it to appear in the sidebar and prev/next navigation.

```json
{
  "id": "ch02_3_gls",
  "title": "2.3 Generalised Least Squares",
  "file": "ch02_3_gls.html",
  "type": "prose",
  "description": "One-line description shown on the index page.",
  "status": "draft"
}
```

- `"type"`: `"prose"` for written chapters, `"widget"` for interactive pages.
- `"status": "draft"` greys the chapter out in the sidebar and index until it is ready. Remove this field (or set to `"published"`) to make it live.
- `"case_studies"`: optional array of `{ "file": "...", "label": "..." }` objects linking out to R case studies.

---

## Colour reference

All colours are CSS custom properties defined in `style.css`.

| Variable | Hex | Use |
|---|---|---|
| `--blue` | `#378ADD` | Primary accent, links |
| `--green` | `#1D9E75` | Positive results, posterior |
| `--amber` | `#D97706` | Warnings |
| `--purple` | `#8B5CF6` | Secondary highlights |
| `--red` | `#E24B4A` | Errors, p-value tails |
| `--yellow` | `#CA8A04` | Prior distributions |
| `--text-muted` | `#6b6a66` | Secondary text, labels |
| `--surface-2` | `#f3f3f1` | Subtle backgrounds (explainer, table rows) |

Each colour also has paired `--colour-bg` and `--colour-text` variables for callout boxes (e.g. `--blue-bg`, `--blue-text`).
