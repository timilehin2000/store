import { BadRequestError, NotFoundError } from "../../utils";
import { PaginationDto, PaginationResultDto } from "../../utils/pagination";
import { CreateCategoryDTO } from "./category.dto";
import { CategoryRepo } from "./category.repository";

export class CatergoryService {
    constructor(private categoryRepo: CategoryRepo) {}

    async createCategory(data: CreateCategoryDTO) {
        const { name } = data;

        const categoryExists = await this.categoryRepo.findByName(
            name.toLowerCase()
        );

        if (categoryExists) {
            throw new BadRequestError("Category already exist");
        }

        const newCategory = await this.categoryRepo.save(data);

        return newCategory;
    }

    async fetchCategories(query: PaginationDto) {
        const [items, count] = await this.categoryRepo.findAndCount(
            {},
            {
                skip: query.skip,
                limit: query.limit,
                order: query.sortOrder,
            }
        );

        return new PaginationResultDto(items, {
            itemCount: count,
            pageOptionsDto: query,
        });
    }

    async fetchCategory(categoryId: string) {
        const category = await this.categoryRepo.findById(categoryId);

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        return category;
    }

    async updateCategory(
        categoryId: string,
        data: {
            name: string;
            description: string;
        }
    ) {
        const category = await this.categoryRepo.findById(categoryId);

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        return await this.categoryRepo.update(categoryId, data);
    }

    async removeCategory(categoryId: string) {
        const category = await this.categoryRepo.findById(categoryId);

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        return this.categoryRepo.delete(categoryId);
    }
}
