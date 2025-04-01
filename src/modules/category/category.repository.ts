import { Model } from "mongoose";
import { BaseRepository } from "../../database";
import { Catergory, ICategory } from "./category.model";

export class CategoryRepo extends BaseRepository<ICategory> {
    constructor(repository: Model<ICategory> = Catergory) {
        super(repository);
    }

    async findByName(name: string): Promise<ICategory | null> {
        return this.findOne({ name: name.toLowerCase() });
    }
}

// import { MockBaseRepository } from "../../../test/base.repository";
// import { ICategory } from "./category.model";
// import { CategoryRepo } from "./category.repository";
// import { CatergoryService } from "./category.service";

// class MockCategoryRepo extends MockBaseRepository<ICategory> {
//     async findByName(name: string): Promise<ICategory | null> {
//         return this.findOne({ name: name.toLowerCase() });
//     }
// }

// describe("CategoryService", () => {
//     let categoryService: CatergoryService;
//     let categoryRepo: MockCategoryRepo;

//     beforeEach(() => {
//         categoryRepo = new MockCategoryRepo();
//         categoryService = new CatergoryService(categoryRepo);
//     });
// });
