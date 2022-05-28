import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { Mock, MockHeader } from '@mock-rocket/mock-rocket';

import { markAllAsDirty } from '../../form-helpers';
import { FormValidators } from '../../form-validators';
import { HTTP_METHODS } from '../../http';

@Component({
  selector: 'popup-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockFormComponent implements OnInit {
  @Input() mock: Mock | null = null;

  @Output() cancelled = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<Mock>();

  form = this.formBuilder.group({
    url: this.formBuilder.control('', [FormValidators.required]),
    httpMethod: this.formBuilder.control(HTTP_METHODS[0], [
      FormValidators.required,
    ]),
    statusCode: this.formBuilder.control(200, [
      FormValidators.required,
      FormValidators.min(0),
    ]),
    delayInMS: this.formBuilder.control(0, [
      FormValidators.required,
      FormValidators.min(0),
    ]),
    body: this.formBuilder.control('', [FormValidators.json]),
    headers: this.formBuilder.array([]),
    isActive: this.formBuilder.control(true),
  });

  httpMethods = HTTP_METHODS;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const mock = this.mock;
    if (!mock) {
      return;
    }

    this.form.patchValue({
      url: mock.url,
      httpMethod: mock.httpMethod,
      statusCode: mock.statusCode,
      delayInMS: mock.delayInMS,
      body: mock.body,
      isActive: mock.isActive,
    });

    mock.headers.map((header) => {
      this.addHeader(header);
    });
  }

  get headers() {
    return this.form.get('headers') as FormArray;
  }

  addHeader(header: Partial<MockHeader> = {}): void {
    this.headers.push(
      this.formBuilder.group({
        key: this.formBuilder.control(header.key || '', [
          FormValidators.required,
        ]),
        value: this.formBuilder.control(header.value || '', [
          FormValidators.required,
        ]),
      })
    );
  }

  removeHeader(index: number): void {
    this.headers.removeAt(index);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.form.controls));

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    this.submitted.emit({
      ...formValue,
      statusCode: +formValue.statusCode,
      delayInMS: +formValue.delayInMS,
    });
  }
}
