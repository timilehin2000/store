export enum RecordOrder {
    ASC = "ASC",
    DESC = "DESC",
}
export class PaginationDto {
    readonly order: RecordOrder = RecordOrder.DESC;

    readonly page: number = 1;

    readonly limit: number = 50;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }

    get sortOrder(): Record<string, 1 | -1> {
        return { createdAt: this.order === RecordOrder.ASC ? 1 : -1 };
    }
}
