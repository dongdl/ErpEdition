import { USER_STATUS } from './user';

export interface IHrRecord {
  id?: number;
  username?: string;
  displayName?: string;
  fullName: string;
  hrCode: string;
  positionCode: string;
  level: string;
  departmentCode: string;
  zone: string;
  region: string;
  taxCode: string;
  bankAccount: string;
  status: USER_STATUS;
  insuranceNumber: string;
}

export interface Family {
  id: number;
  relationShip?: string; // Quan hệ"
  name?: string; // Họ tên"
  birthday?: string; // Ngày sinh"
  gender?: number; // Giới tính"
  job?: string; // Nghề nghiệp"
  workUnit?: string; // Nơi công tác/làm việc"
  permanentAddress?: string; // Hộ khẩu thường trú"
  currentAddress?: string; // Nơi ở hiện tại"
  cardId?: string; // Số CMT/Thẻ căn cước"
  cardDate?: string; // Ngày cấp Số CMT/Thẻ căn cước"
  cardAddress?: string; // Nơi cấp Số CMT/Thẻ căn cước"
  passportNumber?: string; // Số sổ hộ chiếu"
  passportDate?: string; // Ngày cấp hộ chiếu"
  passportExpiredDate?: string; // Ngày hết hạn hộ chiếu"
  homePhone?: string; // Điện thoại nhà riêng"
  mobilePhone?: string; // Điện thoại di động"
  email?: string; // Email BVB"
  emailPrivate?: string; // Email cá nhân"
  description?: string; // ""
}

export enum STATUS {
  collaborators = 1, // cộng tác viên
  Apprentice, // học việc
  probation, // thử việc
  official, // chính thức
  inactivity, // nghỉ việc
  unpaidLeaves, // nghỉ không hưởng lương
  careerBreak, //  Tạm nghỉ, Hoãn hợp đồng
  none = 99,
}

export interface Employee {
  id?: number;
  code?: string;

  fullName?: string; // Họ và tên
  positionCode?: string; // Mã chức danh, tên chức danh
  level?: number; // Cấp bậc
  departmentCode?: string; // Mã đơn vị, tên đơn vị, Mã trung tâm tên trung tâm
  zone?: string; // Vùng (vùng 1, vùng 2…)
  region?: string; // Miền (miền bắc, trung, nam)
  taxCode?: string; // Mã số thuế thu nhập cá nhân
  insuranceNumber?: string; // Số sổ bảo hiểm
  accountNum?: string; // Số TK BVB
  status?: string;
  /*
   * Trạng thái: =1: Cộng tác viên =2: Học việc =3: Thử việc =4: Chính thức =5:
   * Nghỉ việc =6: Nghỉ không lương =7: Tạm nghỉ, Hoãn hợp đồng =99: Chưa phân
   * loại
   */

  photo?: string; // Ảnh thẻ
  birthday?: string; // Ngày sinh
  gender?: number; // Giới tính
  addressCode?: string; // Nơi sinh
  addressEx?: string; // Xóm phố, số nhà…
  ethnicCode?: string; // Dân tộc
  isParty?: boolean; // Là đảng viên
  partyDate?: string; // Ngày vào đảng
  partyPosition?: string; // Chức vụ
  partyAddress?: string; // Nơi vào đảng
  isArmy?: boolean; // Quân đội
  isVeterans?: boolean; // Thương binh
  isMartyrsChild?: boolean; // Con liệt sỹ
  permanentAddress?: string; // Hộ khẩu thường trú
  currentAddress?: string; // Nơi ở hiện tại
  cardId?: string; // Số CMT/Thẻ căn cước
  cardDate?: string; // Ngày cấp Số CMT/Thẻ căn cước
  cardAddress?: string; // Nơi cấp Số CMT/Thẻ căn cước
  passportNumber?: string; // Số sổ hộ chiếu
  passportDate?: string; // Ngày cấp hộ chiếu
  passportExpiredDate?: string; // Ngày hết hạn hộ chiếu
  homePhone?: string; // Điện thoại nhà riêng
  mobilePhone?: string; // Điện thoại di động
  email?: string; // Email BVB
  emailPrivate?: string; // Email cá nhân
  maritalStatus?: string; // Tình trạng hôn nhân (Độc thân/Có gđ/…)
  contactAddress?: string; // Thông tin liên hệ khi cần
  contactPhone?: string; // Số điện thoại liên hệ khi cần
  probationaryDontractDate?: string; // Ngày vào ngân hàng (Ngày quyết định tuyển dụng đầu tiên)
  officialContractDate?: string; // Ngày hợp đồng chính thức
  positionDate?: string; // Ngày bổ nhiệm chức danh hiện tại.
  education?: string; // Trình độ học vấn
  foreignLanguage?: string; // Trình độ ngoại ngữ
  nationalityCode?: string; // Quốc tịch
  description?: string; //
  createdBy?: string; //
  createdDate?: string; //
  modifiedBy?: string; //
  modifiedDate?: string; //

  recruitmentSource?: string; // Nguồn tuyển dụng
  interviewDate?: string; // Ngày phỏng vấn
  recruitmentMinutes?: string; // Biên bản tuyển dụng số
  recruitmentProposal?: string; // Đề nghị tuyển dụng số
  referName?: string; // Thông tin tham khảo - Họ tên
  referPosition?: string; // Thông tin tham khảo - Chức vụ
  referWorkUnit?: string; // Thông tin tham khảo - Đơn vị công tác
  referRelationShip?: string; // Thông tin tham khảo - Mối quan hệ
  referMobile?: string; // Thông tin tham khảo - Mobile
  referEmail?: string; // Thông tin tham khảo - Email
  referDescription?: string; // Thông tin tham khảo - Ghi chú thêm
  referOrganName?: string; // Người thân bạn bè BVB - Họ tên
  referOrganPosition?: string; // Người thân bạn bè BVB - Chức vụ
  referOrganWorkUnit?: string; // Người thân bạn bè BVB - Đơn vị công tác
  referOrganRelationShip?: string; // Người thân bạn bè BVB - Mối quan hệ
  referOrganMobile?: string; // Người thân bạn bè BVB - Mobile
  referOrganEmail?: string; // Người thân bạn bè BVB - Email
  referOrganDescription?: string; // Người thân bạn bè BVB - Ghi chú thêm
  referOtherLocation?: string; // Thông tin tham khảo khác - Vị trí
  referOtherDate?: string; // Thông tin tham khảo khác - Thời gian

  contractRealDate?: string; // Thông tin HĐLĐ ban đầu - Ngày vào thực tế
  contractRealShortDate?: string; // Thông tin HĐLĐ ban đầu - Tháng/Năm
  contractType?: string; // Thông tin HĐLĐ ban đầu - Loại hợp đồng (=1:Học việc;=2:thử việc?: number;=3:chính
  // thức;=99:Other)
  contractDurationDate?: string; // Thông tin HĐLĐ ban đầu - Thời hạn hợp đồng
  contractBeginDate?: string; // Thông tin HĐLĐ ban đầu - HĐLĐ: Ngày bắt đầu
  contractEndDate?: string; // Thông tin HĐLĐ ban đầu - HĐLĐ: Ngày kết thúc

  salaryApprentice?: number; // Thông tin thu nhập - Lương học việc
  salaryProbation?: number; // Thông tin thu nhập - Lương thử việc
  salaryOfficial?: number; // Thông tin thu nhập - Lương chính thức
  salaryOfficialDate?: string; // Thông tin thu nhập - Ngày chính thức
  salaryInsurance?: number; // Thông tin thu nhập - LCB tham gia bảo hiểm
  salaryAllowance1?: number; // Thông tin thu nhập - Phụ cấp 1
  salaryAllowance2?: number; // Thông tin thu nhập - Phụ cấp 2
  relationShip?: string; // Quan hệ
  name?: string; // Họ tên
  families?: Array<Family>;
}

interface IHeaderTableRecord {
  code?: string;
  fullName?: string; // Họ và tên
  positionCode?: string; // Mã chức danh, tên chức danh
  level?: number; // Cấp bậc
  departmentCode?: string; // Mã đơn vị, tên đơn vị, Mã trung tâm tên trung tâm
  zone?: string; // Vùng (vùng 1, vùng 2…)
  region?: string; // Miền (miền bắc, trung, nam)
  taxCode?: string; // Mã số thuế thu nhập cá nhân
  insuranceNumber?: string; // Số sổ bảo hiểm
  accountNum?: string; // Số TK BVB
  status?: string;
}
