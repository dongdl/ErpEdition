class baseEntity {

	createdBy: string;

	createdDate: Date;

	modifiedBy?: string;

	modifiedDate?: string;

	constructor(createdBy: string, createdDate: Date) {
        this.createdBy = createdBy
        this.createdDate = createdDate
    }
}