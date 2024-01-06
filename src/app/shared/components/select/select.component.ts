import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements ControlValueAccessor, Validator, AfterViewInit
{
  @Input() label = '';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() optionList: { title: string; value: string }[] = [];
  value = '';
  disabled = false;
  touched = false;
  ngControl!: NgControl;

  constructor(private inj: Injector) {}

  onChange = (value: any) => {};
  onTouched = () => {};

  onValueChange(event: any) {
    const value = event.target.value;
    this.onChange(value);
  }

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

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
