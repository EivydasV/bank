import { OffsetEdgeInterface } from '@app/shared/db';

export interface OffsetPaginatedInterface<T> {
	edges: OffsetEdgeInterface<T>[];

	totalDocs: number;

	hasNextPage: boolean;

	hasPreviousPage: boolean;

	nextPage: number | null;

	previousPage: number | null;

	currentPage: number;

	totalPages: number;
}
