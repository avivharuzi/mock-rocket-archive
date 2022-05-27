import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonForm } from '../../form-helpers';

@Component({
  selector: 'popup-form-autocomplete-input',
  templateUrl: './form-autocomplete-input.component.html',
  styleUrls: ['./form-autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAutocompleteInputComponent extends CommonForm<string> {
  @Input() type = '';

  @Input() options: string[] = [];
}
