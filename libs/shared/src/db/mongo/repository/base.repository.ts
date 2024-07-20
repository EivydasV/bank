import {
	BaseRepositoryInterface,
	DocId,
	MongooseQuery,
	OmitBaseType,
	documentLimit,
} from '@app/shared';
import {
	FilterQuery,
	HydratedDocument,
	Model,
	ProjectionType,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';

export class BaseRepository<Entity> implements BaseRepositoryInterface<Entity> {
	constructor(private readonly entity: Model<Entity>) {}

	async create(
		payload: Partial<OmitBaseType<Entity>>,
	): Promise<HydratedDocument<Entity>> {
		return this.entity.create(payload);
	}

	updateOrCreate(
		filter: FilterQuery<Entity>,
		update: UpdateQuery<Entity>,
	): MongooseQuery<HydratedDocument<Entity>> {
		return this.entity.findOneAndUpdate(filter, update, {
			upsert: true,
			new: true,
		});
	}

	findById(DocId: DocId): MongooseQuery<HydratedDocument<Entity>> | null {
		return this.entity.findById(DocId);
	}

	findByIdAndUpdate(
		id: DocId,
		update: UpdateQuery<Entity>,
		options?: QueryOptions<Entity> | null | undefined,
	): MongooseQuery<HydratedDocument<Entity>> | null {
		return this.entity.findByIdAndUpdate(id, update, options);
	}

	findByIdAndDelete(id: DocId): MongooseQuery<HydratedDocument<Entity>> | null {
		return this.entity.findByIdAndDelete(id);
	}

	findAll(
		filter?: FilterQuery<HydratedDocument<Entity>>,
	): MongooseQuery<HydratedDocument<Entity>[]> {
		return this.find(filter || {});
	}

	findOne(
		filter: FilterQuery<Entity> | undefined,
	): MongooseQuery<HydratedDocument<Entity>> | null {
		return this.entity.findOne(filter);
	}

	estimateCount(): MongooseQuery<number> {
		return this.entity.estimatedDocumentCount();
	}

	countDocuments(filter?: FilterQuery<Entity>): MongooseQuery<number> {
		return this.entity.countDocuments(filter, { limit: documentLimit });
	}

	protected find(
		filter: FilterQuery<Entity>,
		projection?: ProjectionType<Entity> | null | undefined,
		options?: QueryOptions<Entity> | null | undefined,
	) {
		return this.entity.find(filter, projection, {
			...options,
			limit: documentLimit,
		});
	}
}
