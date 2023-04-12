import { editor } from './editor';
import { monaco } from './monaco';

// https://esbuild.github.io/api/#live-reload
if (process.env.NODE_ENV === 'development') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  );
}

editor.addAction({
  id: 'editor.action.webcrack',
  label: 'Run webcrack',
  run(editor, ...args) {
    console.log('webcrack');
  },
});

editor.addAction({
  id: 'editor.action.save',
  label: 'Save',
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
  run(editor, ...args) {
    console.log('save');
  },
});
