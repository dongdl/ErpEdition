export interface employeeSkill extends baseEntity {
	id?: number;

	code?: string; // Skill: Mã
	fromDate?: string; // Skill: Thời gian
	toDate?: string; // Skill: Thời gian
	company?: string; // Skill: Đơn vị công tác
	department?: string; // Skill: Phòng ban
	position?: string; // Skill: Chức danh
	salary?: number; // Skill: Mức lương
	description?: string; //

	employee?: {};
}
