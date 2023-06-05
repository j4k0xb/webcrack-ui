import { editor } from './editor';
import { evalCode } from './sandbox';
import { WorkerRequest, WorkerResponse } from './webcrack.worker';

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
  worker.postMessage({
    type: 'deobfuscate',
    code: editor.getValue(),
  } satisfies WorkerRequest);
});

const worker = new Worker('./webcrack.worker.js');
worker.onmessage = async ({ data }: MessageEvent<WorkerResponse>) => {
  if (data.type === 'sandbox') {
    try {
      return worker.postMessage({
        type: 'sandbox',
        result: await evalCode(data.code),
      } satisfies WorkerRequest);
    } catch (error) {
      return worker.postMessage({
        type: 'cancel',
        reason: String(error),
      } satisfies WorkerRequest);
    }
  } else if (data.type === 'result') {
    deobfuscateButton.disabled = false;
    editor.pushUndoStop();
    editor.executeEdits('webcrack', [
      {
        range: editor.getModel()!.getFullModelRange(),
        text: data.code,
      },
    ]);
  } else if (data.type === 'error') {
    alert(data.message);
  }
};

const queryParams = new URLSearchParams(location.search);
let code = queryParams.get('code');
if (queryParams.has('url')) {
  const url =
    'https://corsproxy.io/?' + encodeURIComponent(queryParams.get('url')!);
  const response = await fetch(url);
  if (response.ok) {
    code = await response.text();
  } else {
    console.error(response);
  }
}

if (code !== null) {
  editor.executeEdits('webcrack', [
    {
      range: editor.getModel()!.getFullModelRange(),
      text: code,
    },
  ]);
  if (queryParams.has('run')) {
    deobfuscateButton.click();
  }
}
