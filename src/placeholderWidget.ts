import type { editor } from 'monaco-editor';
import { monaco } from './editor';

// Based on https://github.com/microsoft/monaco-editor/issues/568#issuecomment-1499966160
export class PlaceholderContentWidget implements editor.IContentWidget {
  private domNode: HTMLElement | undefined;

  constructor(
    private readonly placeholder: string,
    private readonly editor: editor.ICodeEditor
  ) {
    editor.onDidChangeModelContent(() => this.onDidChangeModelContent());
    this.onDidChangeModelContent();
  }

  private onDidChangeModelContent() {
    if (this.editor.getValue() === '') {
      this.editor.addContentWidget(this);
    } else {
      this.editor.removeContentWidget(this);
    }
  }

  getId() {
    return 'editor.widget.placeholderHint';
  }

  getDomNode() {
    if (!this.domNode) {
      this.domNode = document.createElement('div');
      this.domNode.textContent = this.placeholder;
      this.domNode.style.width = 'max-content';
      this.domNode.style.fontStyle = 'italic';
      this.domNode.style.pointerEvents = 'none';

      this.editor.applyFontInfo(this.domNode);
    }

    return this.domNode;
  }

  getPosition() {
    return {
      position: { lineNumber: 1, column: 1 },
      preference: [monaco.editor.ContentWidgetPositionPreference.EXACT],
    };
  }

  dispose() {
    this.editor.removeContentWidget(this);
  }
}
