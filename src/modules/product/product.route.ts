import { Router } from "express";
import { requireLogin, validate, validateParamsIds } from "../../middleware";
import { productValidation } from "./product.validation";
import { ProductRepo } from "./product.repository";
import { ProductService } from "./product.service";
import { CategoryRepo } from "../category";
import { PRoductController } from "./product.controller";
import { handleAsyncError } from "../../utils";
import { authorize } from "../../middleware/authorization";
import { UserRoleEnum } from "../../interfaces";

const productRouter = Router();

const productRepo = new ProductRepo();
const categoryRepo = new CategoryRepo();
const productService = new ProductService(productRepo, categoryRepo);
const productController = new PRoductController(productService);

productRouter.use(requireLogin);

productRouter.use(authorize(UserRoleEnum.USER));

productRouter.post(
    "/",
    validate(productValidation),
    handleAsyncError(productController.createProduct.bind(productController))
);

productRouter.get(
    "/",
    handleAsyncError(productController.fetchProducts.bind(productController))
);

productRouter.get(
    "/:productId",
    validateParamsIds(["productId"]),
    handleAsyncError(productController.fetchProduct.bind(productController))
);

productRouter.put(
    "/:productId",
    validateParamsIds(["productId"]),
    validate(productValidation),
    handleAsyncError(productController.updateProduct.bind(productController))
);

productRouter.delete(
    "/:productId",
    validateParamsIds(["productId"]),
    handleAsyncError(productController.removeProduct.bind(productController))
);

export { productRouter };
