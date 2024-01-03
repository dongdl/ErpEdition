import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { SubscriptionLike, catchError, of } from 'rxjs';
import { IHrRecord } from '../../model/record';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import ma_chuc_danh from '../../utils/ma_chuc_danh.json';
import ma_don_vi from '../../utils/ma_don_vi.json';
import ma_nhan_su from '../../utils/ma_nhan_su.json';
import { HrRecordsService } from '../hr-records/hr-records.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-edit-record',
  standalone: true,
  imports: [ModalComponent, NgIf, ReactiveFormsModule, SharedModule],
  templateUrl: './add-edit-record.component.html',
  styleUrl: './add-edit-record.component.css',
})
export class AddEditRecordComponent {
  @Input() mode: 'add' | 'view' | 'edit' = 'add';
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() changeRecord = new EventEmitter<IHrRecord>();
  formRecord: FormGroup = new FormGroup({});
  previewRecordSubscription: SubscriptionLike | null = null;
  recordCurrent: IHrRecord | null = null;

  get CODE_LIST() {
    return ma_nhan_su;
  }

  get isDisabled() {
    return this.mode === 'view';
  }

  get POSITION_CODE() {
    return ma_chuc_danh;
  }

  get DEPARTMENT_CODE() {
    return ma_don_vi;
  }

  constructor(
    private fb: FormBuilder,
    private hrRecordService: HrRecordsService,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnDestroy(): void {
    this.previewRecordSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.previewRecordSubscription =
      this.hrRecordService.previewRecord.subscribe((record) => {
        if (record) {
          this.recordCurrent = record;
          this.formRecord = this.fb.group({
            fullName: [record.fullName, Validators.required],
            hrCode: [record.hrCode, Validators.required],
            positionCode: [record.positionCode, Validators.required],
            level: [record.level, Validators.required],
            departmentCode: [record.departmentCode, Validators.required],
            zone: [record.zone, Validators.required],
            region: [record.region, Validators.required],
            taxCode: [record.taxCode, Validators.required],
            bankAccount: [record.bankAccount, Validators.required],
            status: [record.status, Validators.required],
            insuranceNumber: [record.insuranceNumber, Validators.required],
            birthDay: [record.birthDay],
            gender: [record.gender],
            email: [record.email],
            emailBvb: [record.emailBvb],
            maritalStatus: [record.maritalStatus],
            permanentAddress: [record.permanentAddress],
            cardId: [record.cardId],
            currentAddress: [''],
            isPartyMember: [record.isPartyMember],
            isArmy: [record.isArmy],
            isVeterans: ['1'],
            isMartyrSon: ['1'],
          });
        } else {
          this.formRecord = this.fb.group({
            fullName: ['', Validators.required],
            hrCode: ['', Validators.required],
            positionCode: ['', Validators.required],
            level: ['', Validators.required],
            departmentCode: ['', Validators.required],
            zone: ['', Validators.required],
            region: ['', Validators.required],
            taxCode: ['', Validators.required],
            bankAccount: ['', Validators.required],
            status: ['', Validators.required],
            insuranceNumber: ['', Validators.required],
            birthDay: [new Date()],
            gender: ['1'],
            email: [''],
            emailBvb: [''],
            maritalStatus: ['1'],
            permanentAddress: [''],
            currentAddress: [''],
            cardId: [''],
            isPartyMember: ['1'],
            isArmy: ['1'],
            isVeterans: ['1'],
            isMartyrSon: ['1'],
          });
        }
      });

    if (this.mode === 'view') {
      Object.keys(this.formRecord.controls).forEach((field) => {
        const control = this.formRecord.get(field);
        control?.disable({ onlySelf: true });
      });
    }
  }

  get fulName() {
    return this.formRecord.get('fullName');
  }
  get hrCode() {
    return this.formRecord.get('hrCode');
  }

  get positionCode() {
    return this.formRecord.get('positionCode');
  }
  get level() {
    return this.formRecord.get('level');
  }
  get departmentCode() {
    return this.formRecord.get('departmentCode');
  }
  get zone() {
    return this.formRecord.get('zone');
  }
  get region() {
    return this.formRecord.get('region');
  }
  get taxCode() {
    return this.formRecord.get('taxCode');
  }
  get bankAccount() {
    return this.formRecord.get('bankAccount');
  }
  get status() {
    return this.formRecord.get('status');
  }
  get insuranceNumber() {
    return this.formRecord.get('insuranceNumber');
  }
  get birthData() {
    return this.formRecord.get('birthDay');
  }
  get gender() {
    return this.formRecord.get('gender');
  }
  get email() {
    return this.formRecord.get('email');
  }
  get emailBvb() {
    return this.formRecord.get('emailBvb');
  }

  onSubmit() {
    if (this.mode === 'view') return;
    Object.keys(this.formRecord.controls).forEach((field) => {
      const control = this.formRecord.get(field);
      control?.markAsDirty({ onlySelf: true });
    });
    if (this.formRecord.invalid) return;
    if (this.mode === 'add') {
      this.changeRecord.emit(this.formRecord.value);
    } else {
      this.changeRecord.emit({
        ...this.formRecord.value,
        id: this.recordCurrent?.id,
      });
    }
    this.closeModal.emit(false);
  }

  onVerifyRecord() {
    if (this.mode === 'view') {
      this.router.navigate(['duyet-thong-tin']);
    }
  }

  onResetForm() {
    this.formRecord.reset();
  }

  onSend() {
    alert('Đã gửi email thành công');
    this.closeModal.emit(false);
  }
  onClickAdd() {
    this.closeModal.emit(false);
  }

  get isRecordList() {
    return this.router.url === '/thong-tin-tuyen-dung';
  }

  get isConfirmRecord() {
    return this.router.url === '/xac-nhan-thong-tin';
  }

  get isVerifyRecord() {
    return this.router.url === '/duyet-thong-tin-hai-mat';
  }

  onSendEmail() {
    alert('gửi email thành công');
  }

  agree() {
    this.auth
      .confirmCurrentTask()
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {
        alert('Duyệt thong tin thành công');
        this.closeModal.emit(false);
      });

    // alert('Duyệt thong tin thành công');
    // this.closeModal.emit(false);
  }

  toConfirm() {
    this.auth
      .confirmCurrentTask()
      .pipe(catchError((err) => of(err)))
      .subscribe(() => {
        if (this.router.url === '/thong-tin-tuyen-dung') {
          this.router.navigate(['xac-nhan-thong-tin']);
        }
        if (this.router.url === '/xac-nhan-thong-tin') {
          this.router.navigate(['duyet-thong-tin-hai-mat']);
        }
      });

    // if (this.router.url === '/thong-tin-tuyen-dung') {
    //   this.router.navigate(['xac-nhan-thong-tin']);
    // }
    // if (this.router.url === '/xac-nhan-thong-tin') {
    //   this.router.navigate(['duyet-thong-tin-hai-mat']);
    // }

    // if(this.route.pathFromRoot)
    // this.router.navigate(['xac-nhan-thong-tin']);
  }
}
