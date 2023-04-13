import { editor } from './editor';

// https://esbuild.github.io/api/#live-reload
if (process.env.NODE_ENV === 'development') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  );
}

editor.focus();

const deobfuscateButton = document.querySelector<HTMLButtonElement>(
  '.deobfuscate-button'
)!;
deobfuscateButton.disabled = false;
deobfuscateButton.addEventListener('click', () => {
  deobfuscateButton.disabled = true;
  worker.postMessage(editor.getValue());
});

const worker = new Worker('./webcrack.worker.js');
worker.onmessage = ({ data }) => {
  deobfuscateButton.disabled = false;

  if (data.success) {
    editor.pushUndoStop();
    editor.executeEdits('webcrack', [
      {
        range: editor.getModel()!.getFullModelRange(),
        text: data.code,
      },
    ]);
  } else {
    alert(data.error);
  }
};
