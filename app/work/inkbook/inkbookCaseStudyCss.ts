/** Scope case-study CSS under `#inkbook-cs` so global `*` / `body` rules do not affect site Nav. */
const SCOPE_ID = "#inkbook-cs";

export function buildInkbookCaseStudyScopedCss(styleBlock: string): string {
  let s = styleBlock.trim();

  s = s.replace(
    /\*, \*::before, \*::after \{ box-sizing: border-box; margin: 0; padding: 0; \}\s*/g,
    "",
  );

  const bodyMatch = s.match(/body\s*\{([\s\S]*?)\}\s*/);
  const bodyInner = bodyMatch?.[1]?.trim() ?? "";
  s = s.replace(/body\s*\{[\s\S]*?\}\s*/, "");

  s = s.replace(
    /\.sidebar\s*\{\s*position:\s*sticky;\s*top:\s*80px;/,
    ".sidebar { position: sticky; top: 112px;",
  );

  return `${SCOPE_ID} {
${bodyInner}
scroll-behavior: smooth;
}

@scope (${SCOPE_ID}) {
*, *::before, *::after { box-sizing: border-box; }
${s}
}

`;
}
