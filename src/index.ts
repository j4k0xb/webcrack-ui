import { editor, monaco } from './editor';

// https://esbuild.github.io/api/#live-reload
if (process.env.NODE_ENV === 'development') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  );
}

editor.addAction({
  id: 'webcrack',
  label: 'Run webcrack',
  run(editor, ...args) {},
});

editor.addAction({
  id: 'save',
  label: 'Save',
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
  run(editor, ...args) {
    console.log('save');
  },
});
