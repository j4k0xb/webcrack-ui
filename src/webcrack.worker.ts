import { Sandbox } from 'webcrack/dist/deobfuscator/vm';

export type WorkerRequest =
  | { type: 'deobfuscate'; code: string; mangle: boolean }
  | { type: 'sandbox'; result: unknown }
  | { type: 'cancel'; reason: string };

export type WorkerResponse =
  | { type: 'sandbox'; code: string }
  | { type: 'result'; files: { code: string; path: string }[] }
  | { type: 'error'; message: string };

self.onmessage = async ({ data }: MessageEvent<WorkerRequest>) => {
  if (data.type !== 'deobfuscate') return;

  // Workaround because sandybox accesses the DOM, which is not available in workers
  const sandbox: Sandbox = code => {
    return new Promise((resolve, reject) => {
      self.addEventListener('message', onSandboxResponse);
      self.postMessage({ type: 'sandbox', code } satisfies WorkerResponse);

      function onSandboxResponse({ data }: MessageEvent<WorkerRequest>) {
        if (data.type === 'sandbox') {
          self.removeEventListener('message', onSandboxResponse);
          resolve(data.result);
        } else if (data.type === 'cancel') {
          self.removeEventListener('message', onSandboxResponse);
          reject(data.reason);
        }
      }
    });
  };

  // Can't import at the top level because dependencies
  // use await, which is not supported in workers
  const { webcrack } = await import('webcrack');

  try {
    const result = await webcrack(data.code, { sandbox, mangle: data.mangle });
    const files: { code: string; path: string }[] = [];

    result.bundle?.modules.forEach(module => {
      files.push({ code: module.code, path: module.path });
    });
    files.sort((a, b) => a.path.localeCompare(b.path));
    files.unshift({ code: result.code, path: 'deobfuscated.js' });

    postMessage({ type: 'result', files } satisfies WorkerResponse);
  } catch (error) {
    console.error(error);
    postMessage({
      type: 'error',
      message: String(error),
    } satisfies WorkerResponse);
  }
};
