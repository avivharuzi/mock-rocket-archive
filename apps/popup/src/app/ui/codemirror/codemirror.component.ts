import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as CodeMirror from 'codemirror';

import { CommonForm } from '../../form-helpers';
import { normalizeLineEndings } from '../../utils';

@Component({
  selector: 'popup-codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodemirrorComponent
  extends CommonForm<string>
  implements AfterViewInit, OnDestroy
{
  @ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;

  codeMirror: CodeMirror.EditorFromTextArea | null = null;

  ngAfterViewInit(): void {
    this.codeMirror = CodeMirror.fromTextArea(this.editor.nativeElement, {
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: false,
      mode: {
        name: 'javascript',
        json: true,
      },
      theme: 'material-darker',
    });

    this.codeMirror.setValue(this.value || '');

    this.codeMirror.on('change', () => {
      this.codemirrorValueChanged();
    });
  }

  codemirrorValueChanged(): void {
    const value = normalizeLineEndings(this.codeMirror?.getValue() || '');
    if (this.value !== value) {
      this.value = value;
      this.onChange(this.value);
    }
  }

  ngOnDestroy(): void {
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }
}
