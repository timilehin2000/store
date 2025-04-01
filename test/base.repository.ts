import { BaseModel, BaseRepository } from "../src/database";

class MockRepository<T extends BaseModel> {
    private entities: T[] = [];

    async find(query?: any): Promise<T[]> {
        return this.entities;
    }

    async findAndCount(query?: any): Promise<[T[], number]> {
        return [this.entities, this.entities.length];
    }

    async findOne(query?: any): Promise<T | null> {
        return this.entities[0] || null;
    }

    async save(entity: Partial<T>): Promise<T> {
        const newEntity = {
            ...entity,
            _id: (this.entities.length + 1).toString(),
        } as T;
        this.entities.push(newEntity);
        return newEntity;
    }

    async update(
        query: any,
        partialEntity: any
    ): Promise<{ modifiedCount: number }> {
        return { modifiedCount: 1 };
    }

    async delete(query: any): Promise<{ deletedCount: number }> {
        return { deletedCount: 1 };
    }

    async count(query?: any): Promise<number> {
        return this.entities.length;
    }

    async softDelete(query: any): Promise<{ modifiedCount: number }> {
        return { modifiedCount: 1 };
    }
}

export class MockBaseRepository<T extends BaseModel> extends BaseRepository<T> {
    constructor() {
        super(new MockRepository<T>() as any);
    }
}
