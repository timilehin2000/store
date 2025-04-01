import { Model } from "mongoose";
import { BaseRepository } from "../../database";
import { IProduct, Product } from "./product.model";

export class ProductRepo extends BaseRepository<IProduct> {
    constructor(repository: Model<IProduct> = Product) {
        super(repository);
    }
}
