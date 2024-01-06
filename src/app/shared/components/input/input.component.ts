import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  implements ControlValueAccessor, Validator, AfterViewInit
{
  @Input() label = '';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'date' = 'text';
  value = '';
  disabled = false;
  touched = false;
  ngControl!: NgControl;

  constructor(private inj: Injector) {}

  onChange = (value: any) => {};
  onTouched = () => {};

  ngAfterViewInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  get controlInput() {
    return this.ngControl?.control;
  }

  get isDirty() {
    return this.ngControl?.dirty || false;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onValueChange(value: any) {
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {}
}
