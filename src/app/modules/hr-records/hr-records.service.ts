import { Injectable } from '@angular/core'
import { BehaviorSubject, of } from 'rxjs'
import { IHrRecord } from '../../model/record'
import { CONTROL_TYPE } from '../../shared/constant/control-field-type'
import { inputBaseType } from '../../shared/model/input-base.model'
import records from './../../utils/users.json'

@Injectable({
  providedIn: 'root'
})
export class HrRecordsService {
  previewRecord: BehaviorSubject<IHrRecord | any> = new BehaviorSubject(null)
  recordList: BehaviorSubject<any> = new BehaviorSubject(records)

  constructor() {}

  createFieldControlField() {
    const generaInfo: inputBaseType[] = [
      {
        label: 'Mã nhân sự',
        value: '',
        key: 'code',
        required: true,
        order: 1,
        controlType: CONTROL_TYPE.SELECT,
        options: []
      },
      {
        label: 'Họ và tên',
        value: '',
        key: 'fullName',
        required: true,
        order: 2
      },
      {
        label: 'Mã chức danh',
        value: '',
        key: 'positionCode',
        required: true,
        order: 3,
        controlType: CONTROL_TYPE.SELECT,
        options: []
      },
      {
        label: 'Cấp bậc',
        value: '',
        key: 'level',
        required: true,
        order: 4
      },
      {
        label: 'Mã trung tâm',
        value: '',
        key: 'departmentCode',
        required: true,
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
        options: []
      },
      {
        label: 'Miền',
        value: '',
        key: 'region',
        order: 7,
        controlType: CONTROL_TYPE.SELECT,
        options: []
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
        required: true,
        controlType: CONTROL_TYPE.SELECT,
        options: []
      }
    ]
    const personalInfo: inputBaseType[] = [
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
        value: '',
        key: 'gender',
        order: 3,
        controlType: CONTROL_TYPE.SELECT,
        options: []
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
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
        label: 'Ngày vào ngân hàng (Ngày quyết định tuyển dụng đầu tiên)',
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
    const recruitmentInfo: (inputBaseType | { isTitle: true; title: string })[] = [
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
        title: 'Thông tin tham khảo'
      },
      {
        label: 'Thông tin tham khảo - Họ tên',
        key: 'referName',
        value: '',
        order: 5
      },
      {
        label: 'Thông tin tham khảo - Chức vụ',
        key: 'referPosition',
        value: '',
        order: 6
      },
      {
        label: 'Thông tin tham khảo - Đơn vị công tác',
        key: 'referWorkUnit',
        value: '',
        order: 7
      },
      {
        label: 'Thông tin tham khảo - Mối quan hệ',
        key: 'referRelationShip',
        value: '',
        order: 8
      },
      {
        label: 'Thông tin tham khảo - Mobile',
        key: 'referMobile',
        value: '',
        order: 9
      },
      {
        label: ' Thông tin tham khảo - Email',
        key: 'referEmail',
        value: '',
        order: 10
      },
      {
        label: 'Thông tin tham khảo - Ghi chú thêm',
        key: 'referDescription',
        value: '',
        order: 11
      },
      {
        isTitle: true,
        title: "'Người thân bạn bè BVB"
      },
      {
        label: 'Người thân bạn bè BVB - Họ tên',
        key: 'referOrganName',
        value: '',
        order: 12
      },
      {
        label: 'Người thân bạn bè BVB - Chức vụ',
        key: 'referOrganPosition',
        value: '',
        order: 13
      },
      {
        label: 'Người thân bạn bè BVB - Đơn vị công tác',
        key: 'referOrganWorkUnit',
        value: '',
        order: 14
      },
      {
        label: 'Người thân bạn bè BVB - Đơn vị công tác',
        key: 'referOrganWorkUnit',
        value: '',
        order: 15
      },
      {
        label: 'Người thân bạn bè BVB - Mối quan hệ',
        key: 'referOrganRelationShip',
        value: '',
        order: 16
      },
      {
        label: 'Người thân bạn bè BVB - Mobile',
        key: 'referOrganMobile',
        value: '',
        order: 17
      },
      {
        label: 'Người thân bạn bè BVB - Email',
        key: 'referOrganEmail',
        value: '',
        order: 18
      },
      {
        label: 'Người thân bạn bè BVB - Ghi chú thêm',
        key: 'referOrganDescription',
        value: '',
        order: 19
      },
      {
        label: 'Thông tin tham khảo khác - Vị trí',
        key: 'referOtherLocation',
        value: '',
        order: 20
      },
      {
        label: 'Thông tin tham khảo khác - Thời gian',
        key: 'referOtherDate',
        value: '',
        order: 21,
        controlType: CONTROL_TYPE.INPUT_DATE
      }
    ]
    const firstContractInfo: (inputBaseType | { isTitle: true; title: string })[] = [
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
        options: []
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

    const incomeInfo = [
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
        label: ' Lương chính thức',
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

    return of()
  }

  sendRecord(record: IHrRecord) {
    this.previewRecord.next(record)
  }

  addRecord(record: IHrRecord) {
    const list = [...this.recordList.value]
    list.unshift(record)
    this.recordList.next(list)
  }

  editRecord(updatedRecord: Partial<IHrRecord>, recordId: number) {
    const list = [...this.recordList.value]
    const updateItem = list.find((item) => item.id === recordId)
    if (!updateItem) return
    Object.assign(updateItem, updatedRecord)
  }

  deleteRecord(id: number) {
    const list = [...this.recordList.value]
    const index = list.findIndex((item) => item.id === id)
    if (index !== -1) {
      list.splice(index, 1)
      this.recordList.next(list)
    }
  }
}
