import { PaginationMetadataDto } from "./page-meta.dto";
import { PaginationDto } from "./page-options.dto";

export class PaginationResultDto<T> {
    readonly items: T[];

    readonly meta: PaginationMetadataDto;

    constructor(
        data: T[],
        params: {
            itemCount: number;
            pageOptionsDto: PaginationDto;
        }
    ) {
        this.items = data;
        this.meta = new PaginationMetadataDto(params);
    }
}
