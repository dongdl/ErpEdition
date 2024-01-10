export class employeeAttachment extends baseEntity {
	id?: number;

	fileId?: string; // Id file
	folder?: string; // Thư mục lưu trữ file
	fileName?: string; // Tên file
	fileType?: string; // Loại file
	fileSize?: number; // Dung lượng file
	description?: string; // 

	employee?: {};
}
