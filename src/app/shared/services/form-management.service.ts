import { Injectable } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CONTROL_TYPE } from '../constant/control-field-type'
import { inputBaseType } from '../model/input-base.model'
import { InputDate } from '../model/input-date.model'
import { SelectInput } from '../model/select-input.model'
import { TextInput } from '../model/text-input.model'
import { Employee } from '../../model/record'
import { CommonService } from './common.service'
import { map, of, switchMap, tap } from 'rxjs'

@Injectable()
export class FormManagementService {
  // TODO: get from a remote source of question metadata

  constructor(private fb: FormBuilder, private commonService: CommonService) {}

  createEmployeeRecordFields(data?: Employee) {
    let generaInfo: inputBaseType[] = [
      // {
      //   label: 'Mã nhân sự',
      //   value: '',
      //   key: 'code',
      //   // required: true,
      //   order: 1,
      //   controlType: CONTROL_TYPE.SELECT,
      //   options: []
      // },
      {
        label: 'Họ và tên',
        value: '',
        key: 'fullName',
        // required: true,
        order: 2
      },
      {
        label: 'Mã chức danh',
        value: '',
        key: 'positionCode',
        // required: true,
        order: 3,
        controlType: CONTROL_TYPE.SELECT,
        options: []
      },
      {
        label: 'Cấp bậc',
        value: '',
        key: 'level',
        // required: true,
        order: 4
      },
      {
        label: 'Mã trung tâm',
        value: '',
        key: 'departmentCode',
        // required: true,
        order: 5,
        controlType: CONTROL_TYPE.SELECT,
        options: []
      },
      {
        label: 'Vùng',
        value: '',
        key: 'zone',
        order: 6,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Vùng 1', value: '0' },
          { title: 'Vùng 2', value: '1' }
        ]
      },
      {
        label: 'Miền',
        value: '',
        key: 'region',
        order: 7,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Miền bắc', value: '0' },
          { title: 'Miền trung', value: '1' },
          { title: 'Miền name', value: '2' }
        ]
      },
      {
        label: ' Mã số thuế thu nhập cá nhân',
        value: '',
        key: 'taxCode',
        order: 8
      },
      {
        label: ' Số sổ bảo hiểm',
        value: '',
        key: 'insuranceNumber',
        order: 9
      },

      {
        label: ' Số tài khoản BVB',
        value: '',
        key: 'accountNum',
        order: 10
      },
      {
        label: 'Trạng thái',
        value: '',
        key: 'status',
        order: 11,
        // required: true,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Cộng tác viên', value: '1' },
          { title: 'Học việc', value: '2' },
          { title: 'Thử việc', value: '3' },
          { title: 'Chính thức', value: '4' },
          { title: 'Nghỉ việc', value: '5' },
          { title: 'Nghỉ không lương', value: '6' },
          { title: 'Nghỉ không lương đồng', value: '7' },
          { title: 'Chưa phân loại', value: '99' }
        ]
      }
    ]
    let personalInfo: inputBaseType[] = [
      {
        label: 'Ảnh thẻ',
        value: '',
        key: 'photo',
        order: 1
      },
      {
        label: 'Ngày sinh',
        value: '',
        key: 'birthday',
        order: 2,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Giới tính',
        value: '1',
        key: 'gender',
        order: 3,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Nam', value: '1' },
          { title: 'Nữ', value: '0' }
        ]
      },
      {
        label: 'Nơi sinh',
        value: '',
        key: 'addressCode',
        order: 4
      },
      {
        label: 'Số nhà',
        value: '',
        key: 'addressEx',
        order: 5
      },
      {
        label: 'Dân tộc',
        value: '',
        key: 'ethnicCode',
        order: 6,
        controlType: CONTROL_TYPE.SELECT,
        options: []
      },
      {
        label: 'Là đảng viên',
        value: '0',
        key: 'isParty',
        order: 7,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Đã là đảng viên', value: '1' },
          { title: 'Chưa là đảng viên', value: '0' }
        ]
      },
      {
        label: 'Ngày vào đảng',
        value: '',
        key: 'partyDate',
        order: 8,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: ' Chức vụ',
        value: '',
        key: 'partyPosition',
        order: 9
      },
      {
        label: 'Nơi vào đảng',
        value: '',
        key: 'partyAddress',
        order: 10
      },
      {
        label: 'Là quân đội',
        value: '0',
        key: 'isArmy',
        order: 11,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Có', value: '1' },
          { title: 'Không', value: '0' }
        ]
      },

      {
        label: 'Là thương binh',
        value: '0',
        key: 'isVeterans',
        order: 12,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Có', value: '1' },
          { title: 'Không', value: '0' }
        ]
      },

      {
        label: 'Là con liệt sĩ',
        value: '0',
        key: 'isMartyrsChild',
        order: 13,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Có', value: '1' },
          { title: 'Không', value: '0' }
        ]
      },
      {
        label: 'Hộ khẩu thường trú',
        value: '',
        key: 'permanentAddress',
        order: 14
      },
      {
        label: 'Nơi ở hiện tại',
        value: '',
        key: 'currentAddress',
        order: 15
      },
      {
        label: 'Số CMT/Thẻ căn cước',
        value: '',
        key: 'cardId',
        order: 16
      },
      {
        label: ' Ngày cấp Số CMT/Thẻ căn cước',
        value: '',
        key: 'cardDate',
        order: 17,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Nơi cấp Số CMT/Thẻ căn cước',
        value: '',
        key: 'cardAddress',
        order: 18
      },
      {
        label: 'Số sổ hộ chiếu',
        value: '',
        key: 'passportNumber',
        order: 19
      },
      {
        label: ' Ngày cấp hộ chiếu',
        value: '',
        key: 'passportDate',
        order: 20,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Ngày hết hạn hộ chiếu',
        value: '',
        key: 'passportExpiredDate',
        order: 21,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Điện thoại nhà riêng',
        value: '',
        key: 'homePhone',
        order: 22
      },
      {
        label: 'Điện thoại di động',
        value: '',
        key: 'mobilePhone',
        order: 23
      },
      {
        label: 'Email BVB',
        value: '',
        key: 'email',
        order: 24
      },
      {
        label: 'Email cá nhân',
        value: '',
        key: 'emailPrivate',
        order: 25
      },
      {
        label: 'Tình trạng hôn nhân',
        value: '',
        key: 'maritalStatus',
        order: 26,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Độc thân', value: '0' },
          { title: 'Có gia đình', value: '1' }
        ]
      },
      {
        label: 'Thông tin liên hệ khi cần',
        value: '',
        key: 'contactAddress',
        order: 27
      },
      {
        label: 'Số điện thoại liên hệ khi cần',
        value: '',
        key: 'contactPhone',
        order: 28
      },
      {
        label: 'Ngày vào ngân hàng',
        value: '',
        key: 'probationaryDontractDate',
        order: 29,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Ngày hợp đồng chính thức',
        value: '',
        key: 'officialContractDate',
        order: 30,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Ngày bổ nhiệm chức danh hiện tại',
        value: '',
        key: 'positionDate',
        order: 31,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Trình độ học vấn',
        value: '',
        key: 'education',
        order: 32
      },
      {
        label: 'Trình độ ngoại ngữ',
        value: '',
        key: 'foreignLanguage',
        order: 33
      },
      {
        label: 'Quốc tịch',
        value: '',
        key: 'nationalityCode',
        order: 34
      },
      {
        label: 'Miêu tả',
        value: '',
        key: 'description',
        order: 34
      }
    ]
    let recruitmentInfo: (
      | inputBaseType
      | { isTitle: true; title: string; order: number; controlType: string }
    )[] = [
      {
        label: 'Nguồn tuyển dụng',
        key: 'recruitmentSource',
        value: '',
        order: 1
      },
      {
        label: 'Ngày phỏng vấn',
        key: 'interviewDate',
        value: '',
        order: 2,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Biên bản tuyển dụng số',
        key: 'recruitmentMinutes',
        value: '',
        order: 3
      },
      {
        label: 'Đề nghị tuyển dụng số',
        key: 'recruitmentProposal',
        value: '',
        order: 4
      },
      {
        isTitle: true,
        title: 'Thông tin tham khảo',
        controlType: 'header',
        order: 5
      },
      {
        label: 'Họ tên',
        key: 'referName',
        value: '',
        order: 6
      },
      {
        label: 'Chức vụ',
        key: 'referPosition',
        value: '',
        order: 7
      },
      {
        label: 'Đơn vị công tác',
        key: 'referWorkUnit',
        value: '',
        order: 8
      },
      {
        label: 'Mối quan hệ',
        key: 'referRelationShip',
        value: '',
        order: 9
      },
      {
        label: 'Mobile',
        key: 'referMobile',
        value: '',
        order: 10
      },
      {
        label: 'Email',
        key: 'referEmail',
        value: '',
        order: 11
      },
      {
        label: 'Ghi chú thêm',
        key: 'referDescription',
        value: '',
        order: 12
      },
      {
        isTitle: true,
        title: 'Người thân bạn bè BVB',
        controlType: 'header',
        order: 13
      },
      {
        label: 'Họ tên',
        key: 'referOrganName',
        value: '',
        order: 14
      },
      {
        label: 'Chức vụ',
        key: 'referOrganPosition',
        value: '',
        order: 15
      },
      {
        label: 'Đơn vị công tác',
        key: 'referOrganWorkUnit',
        value: '',
        order: 16
      },
      {
        label: 'Đơn vị công tác',
        key: 'referOrganWorkUnit',
        value: '',
        order: 17
      },
      {
        label: 'Mối quan hệ',
        key: 'referOrganRelationShip',
        value: '',
        order: 18
      },
      {
        label: 'Mobile',
        key: 'referOrganMobile',
        value: '',
        order: 19
      },
      {
        label: 'Email',
        key: 'referOrganEmail',
        value: '',
        order: 20
      },
      {
        label: 'Ghi chú thêm',
        key: 'referOrganDescription',
        value: '',
        order: 21
      },
      {
        label: 'Thông tin tham khảo khác - Vị trí',
        key: 'referOtherLocation',
        value: '',
        order: 22
      },
      {
        label: 'Thông tin tham khảo khác - Thời gian',
        key: 'referOtherDate',
        value: '',
        order: 21,
        controlType: CONTROL_TYPE.INPUT_DATE
      }
    ]
    let firstContractInfo: (
      | inputBaseType
      | { isTitle: true; title: string; order: number; controlType: 'string' }
    )[] = [
      {
        label: 'Ngày vào thực tế',
        key: 'contractRealDate',
        order: 1,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Tháng/Năm',
        key: 'contractRealShortDate',
        order: 2,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Loại hợp đồng',
        key: 'contractType',
        order: 3,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Học việc', value: '1' },
          { title: 'Thử việc', value: '2' },
          { title: 'Chính thức', value: '3' },
          { title: 'Khác', value: '99' }
        ]
      },
      {
        label: 'Thời hạn hợp đồng',
        key: 'contractDurationDate',
        order: 4,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'HĐLĐ - Ngày bắt đầu',
        key: 'contractBeginDate',
        order: 5,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'HĐLĐ - Ngày kết thúc',
        key: 'contractEndDate',
        order: 6,
        controlType: CONTROL_TYPE.INPUT_DATE
      }
    ]
    let incomeInfo = [
      {
        label: 'Lương học việc',
        key: 'salaryApprentice',
        order: 7
      },
      {
        label: ' Lương thử việc',
        key: 'salaryProbation',
        order: 8
      },
      {
        label: 'Lương chính thức',
        key: 'salaryOfficial',
        order: 9
      },
      {
        label: 'Ngày chính thức nhận lương',
        key: 'salaryOfficialDate',
        order: 10,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'LCB tham gia bảo hiểm',
        key: 'salaryInsurance',
        order: 11
      },
      {
        label: 'Phụ cấp 1',
        key: 'salaryAllowance1',
        order: 12
      },
      {
        label: 'Phụ cấp 2',
        key: 'salaryAllowance2',
        order: 13
      }
    ]

    return this.commonService.getListDepartment().pipe(
      tap<any>((value) => {
        const department = generaInfo.find((item) => item.key === 'departmentCode')
        department?.options?.push(
          ...value.map((x: any) => ({
            title: x.name,
            value: x.code
          }))
        )
      }),
      switchMap(() => {
        return this.commonService.getEthic()
      }),
      tap<any>((value) => {
        const ethic = personalInfo.find((item) => item.key === 'ethnicCode')
        ethic?.options?.push(
          ...value.map((x: any) => ({
            title: x.name,
            value: x.code
          }))
        )
      }),
      map(() => {
        const tabList = [
          {
            tabId: 1,
            tabTitle: 'Thông tin chung',
            tabContent: generaInfo
          },
          {
            tabId: 2,
            tabTitle: 'Thông tin cá nhân',
            tabContent: personalInfo
          },
          {
            tabId: 3,
            tabTitle: 'Thông tin tuyển dụng',
            tabContent: recruitmentInfo
          },
          {
            tabId: 4,
            tabTitle: 'Thông tin HĐLĐ ban đầu',
            tabContent: firstContractInfo
          },

          {
            tabId: 5,
            tabTitle: 'Thông tin thu nhập',
            tabContent: incomeInfo
          }
        ]

        tabList.forEach((tab) => {
          tab.tabContent.sort((a, b) => (a.order || 0) - (b.order || 1))
        })
        const fieldList = tabList.map((tab) => {
          return {
            ...tab,
            tabContent: tab.tabContent.reduce((fieldList: any[], field) => {
              if (field.controlType === CONTROL_TYPE.INPUT_DATE) {
                fieldList.push(new InputDate(field))
              } else if (field.controlType === CONTROL_TYPE.SELECT) {
                fieldList.push(new SelectInput(field))
              } else if (field.controlType === 'header') {
                fieldList.push(field)
              } else {
                fieldList.push(new TextInput(field))
              }
              return fieldList
            }, [])
          }
        })

        return fieldList
      })
    )
  }

  createFamilyInfoFields() {
    const familyInfoGenerate: inputBaseType[] = [
      {
        label: 'Quan hệ',
        value: '',
        key: 'relationShip',
        // required: true,
        order: 1
      },
      {
        label: 'Họ tên',
        value: '',
        key: 'name',
        // required: true,
        order: 2
      },
      {
        label: 'Ngày sinh',
        value: '',
        key: 'birthday',
        order: 3
      },
      {
        label: 'Giới tính',
        value: '',
        key: 'gender',
        // required: true,
        order: 4,
        controlType: CONTROL_TYPE.SELECT,
        options: [
          { title: 'Nam', value: '0' },
          { title: 'Nữ', value: '1' }
        ]
      },
      {
        label: 'Nghề nghiệp',
        value: '',
        key: 'job',
        order: 5
      },
      {
        label: 'Nơi công tác/làm việc',
        value: '',
        key: 'workUnit',
        order: 6
      },
      {
        label: 'Hộ khẩu thường trú',
        value: '',
        key: 'permanentAddress',

        order: 7
      },
      {
        label: 'Nơi ở hiện tại',
        value: '',
        key: 'currentAddress',

        order: 8
      },
      {
        label: 'Số CMT/Thẻ căn cước',
        value: '',
        key: 'cardId',

        order: 9
      },
      {
        label: 'Ngày cấp Số CMT/Thẻ căn cước',
        value: '',
        key: 'cardDate',

        order: 10
      },
      {
        label: 'Nơi cấp Số CMT/Thẻ căn cước',
        value: '',
        key: 'cardAddress',
        order: 11
      },
      {
        label: 'Số sổ hộ chiếu',
        value: '',
        key: 'passportNumber',

        order: 12
      },
      {
        label: 'Ngày cấp hộ chiếu',
        value: '',
        key: 'passportDate',

        order: 13
      },
      {
        label: 'Ngày hết hạn hộ chiếu',
        value: '',
        key: 'passportExpiredDate',

        order: 14,
        controlType: CONTROL_TYPE.INPUT_DATE
      },
      {
        label: 'Điện thoại nhà riêng',
        value: '',
        key: 'homePhone',
        order: 15
      },
      {
        label: 'Điện thoại di động',
        value: '',
        key: 'mobilePhone',

        order: 16
      },
      {
        label: 'Email BVB',
        value: '',
        key: 'email',
        order: 18
      },
      {
        label: 'Email cá nhân',
        value: '',
        key: 'emailPrivate',
        order: 19
      },
      {
        label: 'Mô tả',
        value: '',
        key: 'description',
        order: 20
      }
    ]

    familyInfoGenerate.sort((a, b) => (a.order || 0) - (b.order || 1))
    return familyInfoGenerate.map((field) => {
      if (field.controlType === CONTROL_TYPE.INPUT_DATE) {
        return new InputDate(field)
      } else if (field.controlType === CONTROL_TYPE.SELECT) {
        return new SelectInput(field)
      }
      return new TextInput(field)
    })
  }

  createSearchFormGroup(fields: inputBaseType[]) {
    return fields.map((field) => {
      if (field.controlType === CONTROL_TYPE.INPUT_DATE) {
        return new InputDate(field)
      } else if (field.controlType === CONTROL_TYPE.SELECT) {
        return new SelectInput(field)
      }
      return new TextInput(field)
    })
  }

  toFormGroup(fieldList: any) {
    const group: any = {}
    fieldList.forEach((field: any) => {
      group[field.key] = field.required
        ? [field.value || '', Validators.required]
        : [field.value || '']
    })
    return this.fb.group(group)
  }

  toFormGroupEmployeeRecord(tabList: any) {
    const group: any = {}
    tabList.forEach((tab: any) => {
      tab.tabContent.forEach((field: any) => {
        if (!field.isTitle) {
          group[field.key] = field.required
            ? [field.value || '', Validators.required]
            : [field.value || '']
        }
      })
    })
    return this.fb.group(group)
  }
}
