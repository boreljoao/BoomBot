codex /model "gpt-5-thinking" --effort high
codex /review <<'PROMPT'
[GOAL]
Fix and refactor the "Services" section so the cards render in a responsive row layout and naturally wrap to the next line; on smaller screens they stack into a single column. Preserve the current visual style as much as possible.

[THINK FIRST — DO NOT PRINT YOUR CHAIN OF THOUGHT]
Privately reason step-by-step about layout issues, conflicting styles, and accessibility gaps. Form a concrete plan before editing. Do not include intermediate reasoning in the output—return only the patch, final snippets, and a short summary.

[CONTEXT]
- Stack: Next.js + React. Tailwind CSS is available (if it isn’t, provide a vanilla CSS fallback).
- Target files: `components/Services.tsx` (or equivalent), global styles/utilities.
- Keep semantic HTML: `<section>`, `<h2>`, `<article>` for each card.

[REQUIREMENTS]
1) Audit:
   - Identify responsiveness issues (fixed widths, overflow, mismatched gaps), and class conflicts.
   - Basic a11y: proper heading order, focus states, aria-labels where needed, color contrast not worsened.

2) Responsive layout (prefer Tailwind):
   - Grid option (preferred):
     Container: `max-w-screen-xl mx-auto px-4`
     Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
   - Flex alternative:
     Container: `max-w-screen-xl mx-auto px-4`
     Row: `flex flex-wrap gap-6`
     Card sizing: `basis-[280px] grow`
   - Breakpoints:
     - <640px: 1 column.
     - 640–1023px: 2 columns.
     - ≥1024px: 3 columns (wrapping if width is constrained).

3) Cards:
   - Each card = `<article>`.
   - Suggested classes: `rounded-2xl shadow-lg p-6 bg-white dark:bg-neutral-900`
   - Title: `<h3 class="text-lg font-semibold">`

4) No Tailwind? Provide equivalent CSS fallback:
   - Grid fallback:
     ```css
     .services-grid {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
       gap: 24px;
       max-width: 1200px; margin: 0 auto; padding: 0 16px;
     }
     ```
   - Flex fallback:
     ```css
     .services-row { display:flex; flex-wrap:wrap; gap:24px; max-width:1200px; margin:0 auto; padding:0 16px; }
     .service-card { flex:1 1 280px; }
     ```

5) Performance & DX:
   - Remove dead/duplicate styles and fixed widths that break wrapping.
   - Avoid adding new deps.

[ACCEPTANCE CRITERIA]
- 360–639px: single column, no horizontal scroll.
- 640–1023px: stable 2-column layout.
- ≥1024px: 3 columns; wraps gracefully without overlap when space is tight.
- Minimal layout shift on resize; no regressions outside the section.

[DELIVERABLES]
- Unified diff patch for all changes (.tsx/.jsx/.css).
- Final code snippet of the Services container (Tailwind + fallback).
- Short summary of what changed and why (no step-by-step reasoning).

[ACTION]
1) Perform a deep review of the current Services code and styles.
2) Implement the responsive row-with-wrap behavior and mobile stacking.
3) Return the diff + final snippet + a brief summary.
PROMPT
