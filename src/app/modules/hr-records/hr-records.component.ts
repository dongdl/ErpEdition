import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import ma_nhan_su from '../../utils/ma_nhan_su.json';
import ma_chuc_danh from '../../utils/ma_chuc_danh.json';
import ma_don_vi from '../../utils/ma_don_vi.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrRecordsService } from './hr-records.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hr-records',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './hr-records.component.html',
  styleUrl: './hr-records.component.css',
})
export class HrRecordsComponent implements OnInit, OnDestroy {
  formRecord: FormGroup = new FormGroup({});
  previewRecordSubscription: Subscription | null = null;

  get CODE_LIST() {
    return ma_nhan_su;
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
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.previewRecordSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.previewRecordSubscription =
      this.hrRecordService.previewRecord.subscribe((record) => {
        if (record) {
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
            isPartyMember: [record.isPartyMember],
            isArmy: [record.isArmy],
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
    Object.keys(this.formRecord.controls).forEach((field) => {
      const control = this.formRecord.get(field);
      control?.markAsDirty({ onlySelf: true });
    });
    if (this.formRecord.invalid) return;

    this.hrRecordService.sendRecord(this.formRecord.value);
    this.router.navigate(['xac-nhan-thong-tin']);
  }

  onResetForm() {
    this.formRecord.reset();
  }
}
