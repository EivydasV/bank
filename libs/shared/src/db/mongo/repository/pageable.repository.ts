import {
	OffsetPaginatedInterface,
	OffsetPaginationInput,
	PageLimitReachedError,
} from '@app/shared';
import { FilterQuery, HydratedDocument, Model } from 'mongoose';
import { BaseRepository } from './base.repository';

export class PageableRepository<Entity> extends BaseRepository<Entity> {
	constructor(private readonly model: Model<Entity>) {
		super(model);
	}

	async offsetPaginate(
		offsetPaginationInput: OffsetPaginationInput,
		filters?: FilterQuery<HydratedDocument<Entity>>,
	): Promise<OffsetPaginatedInterface<Entity>> {
		const { perPage, skip, isLimitReached } = offsetPaginationInput;

		if (isLimitReached) {
			throw new PageLimitReachedError();
		}

		const findPromise = this.model
			.find(filters || {})
			.limit(perPage)
			.skip(skip);

		const countPromise = this.countDocuments(filters);

		const [docs, totalDocs] = await Promise.all([findPromise, countPromise]);

		return this.paginate(offsetPaginationInput, docs, totalDocs);
	}

	private paginate(
		pageInfo: OffsetPaginationInput,
		docs: Entity[],
		totalDocs: number,
	): OffsetPaginatedInterface<Entity> {
		const totalPages = Math.ceil(totalDocs / pageInfo.perPage);

		return {
			edges: docs.map((doc) => ({
				node: doc,
			})),
			totalDocs,
			totalPages,
			currentPage: pageInfo.page,
			hasNextPage: pageInfo.page < totalPages,
			hasPreviousPage: pageInfo.page > 1,
			nextPage: pageInfo.page + 1 > totalPages ? null : pageInfo.page + 1,
			previousPage: pageInfo.page - 1 < 1 ? null : pageInfo.page - 1,
		};
	}
}
