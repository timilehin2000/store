import { Router } from "express";
import { validate, validateParamsIds } from "../../middleware/validate";
import {
    categoryValidation,
    createCategoryValidation,
} from "./categoty.validation";
import { CategoryRepo } from "./category.repository";
import { CatergoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { handleAsyncError } from "../../utils";
import { requireLogin } from "../../middleware";
import { authorize } from "../../middleware/authorization";
import { UserRoleEnum } from "../../interfaces";

const categoryRouter = Router();

const categoryRepo = new CategoryRepo();
const catergoryService = new CatergoryService(categoryRepo);
const categoryController = new CategoryController(catergoryService);

categoryRouter.use(requireLogin);

categoryRouter.use(authorize(UserRoleEnum.ADMIN));

categoryRouter.post(
    "/",
    validate(createCategoryValidation),
    handleAsyncError(categoryController.createCategory.bind(categoryController))
);

categoryRouter.get(
    "/",
    handleAsyncError(
        categoryController.fetchCategories.bind(categoryController)
    )
);

categoryRouter.get(
    "/:categoryId",
    validateParamsIds(["categoryId"]),
    handleAsyncError(categoryController.fetchCategory.bind(categoryController))
);

categoryRouter.put(
    "/:categoryId",
    validateParamsIds(["categoryId"]),
    validate(categoryValidation),
    handleAsyncError(categoryController.updateCategory.bind(categoryController))
);

categoryRouter.delete(
    "/:categoryId",
    validateParamsIds(["categoryId"]),
    handleAsyncError(categoryController.removeCategory.bind(categoryController))
);

export { categoryRouter };
