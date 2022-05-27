import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonForm } from '../../form-helpers';

@Component({
  selector: 'popup-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent extends CommonForm<string> {
  @Input() type = '';
}
