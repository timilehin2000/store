import { NotFoundError } from "../../utils";
import { PaginationDto, PaginationResultDto } from "../../utils/pagination";
import { CategoryRepo } from "../category";
import { CreateProductDTO } from "./product.dto";
import { ProductRepo } from "./product.repository";

export class ProductService {
    constructor(
        private readonly productRepo: ProductRepo,
        private readonly categoryRepo: CategoryRepo
    ) {}

    async createProduct(userId: string, data: CreateProductDTO) {
        const { category } = data;

        const categoryExists = await this.categoryRepo.findById(category);

        if (!categoryExists) {
            throw new NotFoundError("Catergory not found");
        }

        const product = await this.productRepo.save({
            ...data,
            category: categoryExists._id,
            userId,
        });

        return product;
    }

    async fetchProducts(query: PaginationDto) {
        const [items, count] = await this.productRepo.findAndCount(
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

    async fetchProduct(productId: string) {
        const product = await this.productRepo.findById(productId);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return product;
    }

    async updateProduct(
        productId: string,
        data: {
            name: string;
            description: string;
            price: number;
            category: string;
            stockQuantity: string;
            imageUrl?: string;
        }
    ) {
        const product = await this.productRepo.findById(productId);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return await this.productRepo.update(productId, data);
    }

    async removeProduct(productId: string) {
        const product = await this.productRepo.findById(productId);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return this.productRepo.delete(productId);
    }
}
