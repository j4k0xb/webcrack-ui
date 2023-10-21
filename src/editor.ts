import monaco from 'monaco-editor';
import { PlaceholderContentWidget } from './placeholderWidget';
import { evalCode } from './sandbox';

monaco.editor.defineTheme('dark', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#1e1e20',
  },
});

export const editor = monaco.editor.create(document.getElementById('editor')!, {
  language: 'javascript',
  theme: 'dark',
  automaticLayout: true,
  padding: { top: 20 },
  wordWrap: 'on',
});

new PlaceholderContentWidget(
  '// Paste your obfuscated or bundled code here',
  editor
);
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

// TODO: parse/generate the AST to properly replace the selection?
editor.addAction({
  id: 'editor.action.evaluate-expression',
  label: 'Evaluate and replace selection (value)',
  keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Enter],
  async run(editor, ...args) {
    const selections = editor.getSelections();
    if (!selections) return;

    const expressions = selections
      .map(selection => editor.getModel()!.getValueInRange(selection))
      .join(',\n');
    // New lines are added so line comments don't mess up the rest of the code
    const code = `[\n${expressions}\n]`;
    const values = (await evalCode(code)) as unknown[];

    // @ts-ignore
    const generator = (await import('@babel/generator')).default.default;
    const t = (await import('@babel/types')).default;
    const nodes = values.map(value => t.valueToNode(value));
    const resultCodes = nodes.map(node => generator(node).code);

    editor.pushUndoStop();
    editor.executeEdits(
      'webcrack',
      selections.map((selection, index) => ({
        range: selection,
        text: resultCodes[index],
      }))
    );
  },
});

editor.addAction({
  id: 'editor.action.evaluate-raw',
  label: 'Evaluate and replace selection (raw)',
  keybindings: [
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
  ],
  async run(editor, ...args) {
    const selections = editor.getSelections();
    if (!selections) return;

    const expressions = selections
      .map(selection => editor.getModel()!.getValueInRange(selection))
      .join(',\n');
    // New lines are added so line comments don't mess up the rest of the code
    const code = `[\n${expressions}\n]`;
    const values = (await evalCode(code)) as unknown[];
    if (values.some(value => typeof value !== 'string')) {
      console.log(values);
      throw new Error('All evaluated values must be strings');
    }

    editor.pushUndoStop();
    editor.executeEdits(
      'webcrack',
      selections.map((selection, index) => ({
        range: selection,
        text: values[index] as string,
      }))
    );
  },
});

const commandPalette = editor.getAction('editor.action.quickCommand')!;
editor.addCommand(
  monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP,
  () => commandPalette.run()
);

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
