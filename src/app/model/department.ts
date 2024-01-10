export interface department extends baseEntity {
	id?: number;

	code?: string; // Mã phòng ban
	parentLevel?: number; // Vị trí hiển thị bậc 1
	level?: number; // Vị trí hiển thị bậc 2
	name?: string; // Tên phòng ban
	category?: string; // Loại phòng
	description?: string; 
	
	employees?: [];

}