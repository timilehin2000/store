import { Model, FilterQuery, UpdateQuery, Types } from "mongoose";
import { BaseModel } from "./base.schema";

export class BaseRepository<T extends BaseModel> {
    constructor(private readonly model: Model<T>) {}

    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return this.model.find(filter);
    }

    async findAndCount(
        query: FilterQuery<T> = {},
        options: {
            skip?: number;
            limit?: number;
            order?: Record<string, 1 | -1>;
        } = {}
    ): Promise<[T[], number]> {
        const { skip = 0, limit = 10, order = { createdAt: -1 } } = options;

        const [items, count] = await Promise.all([
            this.model.find(query).sort(order).skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec(),
        ]);

        return [items, count];
    }

    async findById(id: string | Types.ObjectId): Promise<T | null> {
        const objectId = new Types.ObjectId(id);
        return this.model.findById(objectId);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter);
    }

    async save(data: Partial<T>): Promise<T> {
        const newRecord = new this.model(data);
        return newRecord.save();
    }

    async update(
        id: string | Types.ObjectId,
        updateData: UpdateQuery<T>
    ): Promise<T | null> {
        const objectId = new Types.ObjectId(id);
        return this.model.findByIdAndUpdate(objectId, updateData, {
            new: true,
        });
    }

    async delete(id: string | Types.ObjectId): Promise<boolean> {
        const objectId = new Types.ObjectId(id);
        const result = await this.model.deleteOne({ _id: objectId });
        return result.deletedCount > 0;
    }

    async count(filter?: FilterQuery<T>): Promise<number> {
        return this.model.countDocuments(filter);
    }

    async softDelete(id: string | Types.ObjectId): Promise<T | null> {
        const objectId = new Types.ObjectId(id);
        return this.model.findByIdAndUpdate(
            objectId,
            { deletedAt: new Date() },
            { new: true }
        );
    }
}
