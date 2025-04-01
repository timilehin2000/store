import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { SuccessResponse } from "../../utils";
import { PaginationDto } from "../../utils/pagination";

export class PRoductController {
    constructor(private readonly productService: ProductService) {}

    async createProduct(req: Request, res: Response) {
        const data = req.body;

        const { id } = req.user;

        const result = await this.productService.createProduct(id, data);

        return SuccessResponse.send(
            res,
            result,
            "Product created successfully",
            201
        );
    }

    async fetchProducts(req: Request, res: Response) {
        const query = req.query;

        const q = Object.assign(new PaginationDto(), {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        });

        const result = await this.productService.fetchProducts(q);

        return SuccessResponse.sendPaginated(
            res,
            result.items,
            result.meta,
            "Categories fetchd Successfully",
            200
        );
    }

    async fetchProduct(req: Request, res: Response) {
        const { productId } = req.params;

        const result = await this.productService.fetchProduct(productId);

        return SuccessResponse.send(
            res,
            result,
            "Product fetchd Successfully",
            200
        );
    }

    async updateProduct(req: Request, res: Response) {
        const { productId } = req.params;

        const data = req.body;

        const result = await this.productService.updateProduct(productId, data);

        return SuccessResponse.send(
            res,
            result,
            "Product updated Successfully",
            200
        );
    }

    async removeProduct(req: Request, res: Response) {
        const { productId } = req.params;

        await this.productService.removeProduct(productId);

        return SuccessResponse.send(
            res,
            {},
            "Product deleted Successfully",
            200
        );
    }
}
