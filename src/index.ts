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

const fileList = document.querySelector<HTMLSelectElement>('#files')!;

const mangleButton = document.querySelector<HTMLInputElement>('#mangle')!;

const deobfuscateButton = document.querySelector<HTMLButtonElement>(
  '.deobfuscate-button'
)!;
deobfuscateButton.disabled = false;
deobfuscateButton.addEventListener('click', () => {
  deobfuscateButton.disabled = true;
  worker.postMessage({
    type: 'deobfuscate',
    code: editor.getValue(),
    mangle: mangleButton.checked,
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
        text: data.files[0].code,
      },
    ]);

    fileList.innerHTML = '';
    fileList.onchange = () => {
      const file = data.files[fileList.selectedIndex];
      editor.setValue(file.code);
    };

    for (const file of data.files) {
      const option = document.createElement('option');
      option.textContent = file.path;
      fileList.appendChild(option);
    }

    fileList.style.visibility = data.files.length > 1 ? 'visible' : 'hidden';
  } else if (data.type === 'error') {
    deobfuscateButton.disabled = false;
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
