/** Scope case-study CSS under `#protein-snacker-cs` so global `*` / `body` rules do not affect site Nav. */
const SCOPE_ID = "#protein-snacker-cs";

export function buildProteinCaseStudyScopedCss(styleBlock: string): string {
  let s = styleBlock.trim();

  s = s.replace(
    /\*, \*::before, \*::after \{ box-sizing: border-box; margin: 0; padding: 0; \}\s*/g,
    "",
  );
  s = s.replace(/html\s*\{\s*scroll-behavior:\s*smooth;\s*\}\s*/g, "");

  const rootMatch = s.match(/:root\s*\{([\s\S]*?)\}\s*/);
  const rootInner = rootMatch?.[1]?.trim() ?? "";
  s = s.replace(/:root\s*\{[\s\S]*?\}\s*/, "");

  const bodyMatch = s.match(/body\s*\{([\s\S]*?)\}\s*/);
  const bodyInner = bodyMatch?.[1]?.trim() ?? "";
  s = s.replace(/body\s*\{[\s\S]*?\}\s*/, "");

  s = s.replace(
    /\.sidebar\s*\{\s*position:\s*sticky;\s*top:\s*32px;/,
    ".sidebar { position: sticky; top: 112px;",
  );

  return `${SCOPE_ID} {
${rootInner}
${bodyInner}
scroll-behavior: smooth;
}

@scope (${SCOPE_ID}) {
*, *::before, *::after { box-sizing: border-box; }
${s}
}

`;
}
