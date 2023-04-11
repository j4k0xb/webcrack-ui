import loader from '@monaco-editor/loader';
import { PlaceholderContentWidget } from './placeholderWidget';

export const monaco = await loader.init();
export const editor = monaco.editor.create(document.getElementById('editor')!, {
  language: 'javascript',
  theme: 'vs-dark',
  automaticLayout: true,
  padding: {
    top: 20,
  },
});

new PlaceholderContentWidget('// Paste your obfuscated code here', editor);

editor.focus();
