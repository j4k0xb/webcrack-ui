import { editor } from './editor';

// https://esbuild.github.io/api/#live-reload
if (process.env.NODE_ENV === 'development') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  );
}

editor.focus();

const reportBugButton =
  document.querySelector<HTMLAnchorElement>('.report-bug')!;

reportBugButton.addEventListener('click', event => {
  event.preventDefault();

  const template = `
## Describe the bug

<!-- Clear and concise description of what the bug is -->

## Expected behaviour

<!-- Clear and concise description of what you expected to happen -->

## Input Code

\`\`\`js
${editor.getValue()}
\`\`\`
`;

  window.open(
    `https://github.com/j4k0xb/webcrack/issues/new?body=${encodeURIComponent(
      template
    )}`,
    '_blank'
  );
});
