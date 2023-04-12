import { monaco } from './monaco';
import { PlaceholderContentWidget } from './placeholderWidget';
import { WebcrackOverlayWidget } from './webcrackWidget';

export const editor = monaco.editor.create(document.getElementById('editor')!, {
  language: 'javascript',
  theme: 'vs-dark',
  automaticLayout: true,
  padding: { top: 20 },
  wordWrap: 'on',
});

new PlaceholderContentWidget('// Paste your obfuscated code here', editor);
new WebcrackOverlayWidget(editor);

editor.focus();
