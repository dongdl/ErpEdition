import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { IUser, USER_STATUS } from '../../../model/user';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-add-edit-user-form',
  standalone: true,
  imports: [ModalComponent, NgIf, ReactiveFormsModule, SharedModule],
  templateUrl: './add-edit-user-form.component.html',
  styleUrl: './add-edit-user-form.component.css',
})
export class AddEditUserFormComponent implements OnInit, OnChanges {
  @Input() user: IUser | null = null;
  @Input() mode: 'edit' | 'add' = 'add';
  @Output() submitUser = new EventEmitter<IUser>();
  formUser: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formUser = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      fullName: ['', Validators.required],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user' in changes && this.mode === 'edit') {
      if (changes['user']?.currentValue) {
        const { id, status, ...rest } = changes['user']?.currentValue;
        this.formUser.setValue(
          { ...rest },
          {
            onlySelf: true,
          }
        );
      }
    } else {
      this.formUser.reset();
    }
  }

  get username() {
    return this.formUser?.get('username');
  }

  get displayName() {
    return this.formUser?.get('displayName');
  }

  get fullName() {
    return this.formUser?.get('fullName');
  }

  onSubmit() {
    if (this.formUser.invalid) return;
    if (this.mode === 'add') {
      this.submitUser.emit({
        ...this.formUser.value,
        status: USER_STATUS.InActive,
      });
    }
    if (this.mode === 'edit') {
      this.submitUser.emit({ id: this.user?.id, ...this.formUser.value });
    }
    this.formUser.reset();
  }
}
