import type { editor } from 'monaco-editor';
import { monaco } from './monaco';

export class WebcrackOverlayWidget implements editor.IOverlayWidget {
  private domNode: HTMLElement | undefined;

  constructor(private readonly editor: editor.ICodeEditor) {
    editor.addOverlayWidget(this);
  }

  getId() {
    return 'editor.widget.webcrack';
  }

  getDomNode() {
    if (!this.domNode) {
      this.domNode = document.createElement('button');
      this.domNode.className = 'deobfuscate-button';
      this.domNode.textContent = 'Deobfuscate';
      this.domNode.addEventListener('click', () => {
        this.editor.getAction('editor.action.webcrack')?.run();
      });
    }

    return this.domNode;
  }

  getPosition(): editor.IOverlayWidgetPosition | null {
    return {
      preference:
        monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
    };
  }

  dispose() {
    this.editor.removeOverlayWidget(this);
  }
}
