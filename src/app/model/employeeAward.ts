export interface employeeAward extends baseEntity {
	id?: number;

	awards?: string; // Danh hiệu
	awardDate?: string; // Ngày trao giải
	description?: string; //

	employee?: {};

}