import { DocId, MongooseQuery, OmitBaseType } from '@app/shared';
import {
	FilterQuery,
	HydratedDocument,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';

export interface BaseRepositoryInterface<Entity> {
	create(
		payload: Partial<OmitBaseType<Entity>>,
	): Promise<HydratedDocument<Entity>>;
	updateOrCreate(
		filter: FilterQuery<Entity>,
		update: UpdateQuery<Entity>,
	): MongooseQuery<HydratedDocument<Entity>>;
	findById(id: DocId): MongooseQuery<HydratedDocument<Entity>> | null;
	findByIdAndUpdate(
		id: DocId,
		data: UpdateQuery<Entity>,
		options?: QueryOptions<Entity> | null | undefined,
	): MongooseQuery<HydratedDocument<Entity>> | null;
	findByIdAndDelete(id: DocId): MongooseQuery<HydratedDocument<Entity>> | null;
	findAll(
		filter?: FilterQuery<HydratedDocument<Entity>>,
	): MongooseQuery<HydratedDocument<Entity>[]>;
	findOne(
		filter: FilterQuery<Entity> | undefined,
	): MongooseQuery<HydratedDocument<Entity>> | null;
	estimateCount(): MongooseQuery<number>;
	countDocuments(filter?: FilterQuery<Entity>): MongooseQuery<number>;
}
