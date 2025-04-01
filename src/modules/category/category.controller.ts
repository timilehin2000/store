import { Request, Response } from "express";
import { CatergoryService } from "./category.service";
import { SuccessResponse } from "../../utils";
import { PaginationDto } from "../../utils/pagination";

export class CategoryController {
    constructor(private readonly categoryService: CatergoryService) {}

    async createCategory(req: Request, res: Response) {
        const data = req.body;

        const result = await this.categoryService.createCategory(data);

        return SuccessResponse.send(
            res,
            result,
            "Category created successfully",
            201
        );
    }

    async fetchCategories(req: Request, res: Response) {
        const query = req.query;

        const q = Object.assign(new PaginationDto(), {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        });

        const result = await this.categoryService.fetchCategories(q);

        return SuccessResponse.sendPaginated(
            res,
            result.items,
            result.meta,
            "Categories fetchd Successfully",
            200
        );
    }

    async fetchCategory(req: Request, res: Response) {
        const { categoryId } = req.params;

        const result = await this.categoryService.fetchCategory(categoryId);

        return SuccessResponse.send(
            res,
            result,
            "Category fetchd Successfully",
            200
        );
    }

    async updateCategory(req: Request, res: Response) {
        const { categoryId } = req.params;

        const data = req.body;

        const result = await this.categoryService.updateCategory(
            categoryId,
            data
        );

        return SuccessResponse.send(
            res,
            result,
            "Category updated Successfully",
            200
        );
    }

    async removeCategory(req: Request, res: Response) {
        const { categoryId } = req.params;

        const result = await this.categoryService.removeCategory(categoryId);

        return SuccessResponse.send(
            res,
            {},
            "Category deleted Successfully",
            200
        );
    }
}
