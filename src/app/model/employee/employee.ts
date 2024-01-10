export interface employee extends baseEntity {

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
	/*
	 * Trạng thái: =1: Cộng tác viên =2: Học việc =3: Thử việc =4: Chính thức =5:
	 * Nghỉ việc =6: Nghỉ không lương =7: Tạm nghỉ, Hoãn hợp đồng =99: Chưa phân
	 * loại
	 */
	status?: string;

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
	academicLevel?: string; // Trình độ học vấn
	foreignLanguage?: string; // Trình độ ngoại ngữ
	nationalityCode?: string; // Quốc tịch
	description?: string;

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
	contractType? : number; // Thông tin HĐLĐ ban đầu - Loại hợp đồng (=1:Học việc;=2:thử việc?: number;=3:chính
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

	educationType?: string; // TRÌNH ĐỘ ĐẠI HỌC: Trình độ (ĐH, CĐ)
	academicMajor?: string; // TRÌNH ĐỘ ĐẠI HỌC: Chuyên ngành
	academicEducation?: string; // TRÌNH ĐỘ ĐẠI HỌC: Trường Đại Học
	academicGraduationYear?: number; // TRÌNH ĐỘ ĐẠI HỌC: Năm tốt nghiệp
	academicCertificateCategory?: string; // TRÌNH ĐỘ ĐẠI HỌC: Xếp loại tốt nghiệp
	academicMethod?: string; // TRÌNH ĐỘ ĐẠI HỌC: Hình thức đào tạo
	academicCountry?: string; // TRÌNH ĐỘ ĐẠI HỌC: Quốc gia
	afterUniversityLevel?: string; // TRÌNH ĐỘ SAU ĐẠI HỌC: Trình độ
	afterUniversityMajor?: string; // TRÌNH ĐỘ SAU ĐẠI HỌC: Chuyên ngành
	afterUniversityEducation?: string; // TRÌNH ĐỘ SAU ĐẠI HỌC: Trường Đại Học
	afterUniversityGraduationYear?: number; // TRÌNH ĐỘ SAU ĐẠI HỌC: Năm tốt nghiệp
	afterUniversityCertificateCategory?: string; // TRÌNH ĐỘ SAU ĐẠI HỌC: Xếp loại tốt nghiệp
	afterUniversityMethod?: string; // TRÌNH ĐỘ SAU ĐẠI HỌC: Hình thức đào tạo
	afterUniversityCountry?: string; // TRÌNH ĐỘ SAU ĐẠI HỌC: Quốc gia
	otherEducation?: string; // Các khóa, hình thức đào tạo khác
	language1?: string; // NGOẠI NGỮ: Ngoại ngữ 1
	language1Description?: string; // NGOẠI NGỮ: Ghi chú
	language2?: string; // NGOẠI NGỮ: Ngoại ngữ 2
	language2Description?: string; // NGOẠI NGỮ: Ghi chú
	languageOther?: string;

	department?: {};
	families?: [];
	employeeAttachments?: [];
	employeeAwards?: [];
	employeeSkills?: [];
	employeeHistories?: [];

}