import monaco from 'monaco-editor';
import { PlaceholderContentWidget } from './placeholderWidget';

export const editor = monaco.editor.create(document.getElementById('editor')!, {
  language: 'javascript',
  theme: 'vs-dark',
  automaticLayout: true,
  padding: { top: 20 },
  wordWrap: 'on',
});

new PlaceholderContentWidget('// Paste your obfuscated code here', editor);
const deobfuscateButton = document.querySelector<HTMLButtonElement>(
  '.deobfuscate-button'
)!;

editor.addAction({
  id: 'editor.action.webcrack',
  label: 'Run webcrack',
  keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.Enter],
  run(editor, ...args) {
    deobfuscateButton.click();
  },
});

editor.addAction({
  id: 'editor.action.save',
  label: 'Save',
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
  run(editor, ...args) {
    const code = editor.getValue();
    if (code === '') return;

    const blob = new Blob([code], {
      type: 'application/javascript;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `deobfuscated-${new Date().toISOString()}.js`
    );
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  },
});
