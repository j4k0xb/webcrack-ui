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

const issueTemplate = `## Describe the bug

<!-- Clear and concise description of what the bug is -->

## Expected behaviour

<!-- Clear and concise description of what you expected to happen -->

## Input Code

\`\`\`js

\`\`\``;

reportBugButton.href = `https://github.com/j4k0xb/webcrack/issues/new?body=${encodeURIComponent(
  issueTemplate
)}`;
