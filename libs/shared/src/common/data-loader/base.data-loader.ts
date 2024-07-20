import { FilterType } from '@app/shared/common';
import { DocId, IdModel } from '@app/shared/db';
import * as DataLoader from 'dataloader';

export abstract class BaseDataLoader<K extends IdModel> extends DataLoader<
	DocId,
	K[]
> {
	protected constructor() {
		super((keys) => this.batchLoadFn(keys));
	}

	private async batchLoadFn(ids: readonly DocId[]): Promise<K[][]> {
		const docs = await this.query(ids);

		return this.mapResults(docs, ids);
	}

	async loadManyToResult(ids: readonly DocId[]): Promise<K[]> {
		const docs = await this.loadMany(ids);
		for (const doc of docs) {
			if (doc instanceof Error) {
				throw doc;
			}
		}

		return docs[0] as unknown as K[];
	}

	async loadToResult(id: DocId): Promise<K> {
		const docs = await this.load(id);
		if (docs.length !== 1) {
			throw new Error('Expected one document');
		}

		return docs[0];
	}

	private mapResults(docs: K[], ids: readonly DocId[]): K[][] {
		const docsMap = new Map<string, K[]>();

		for (const doc of docs) {
			const key = doc[this.getKey()]?.toString();
			if (!key) {
				throw new Error('Key not found');
			}

			if (!docsMap.has(key)) {
				docsMap.set(key, []);
			}

			// biome-ignore lint/style/noNonNullAssertion: <key is set in if statement above>
			docsMap.get(key)!.push(doc);
		}

		return ids.map((id) => docsMap.get(id.toString()) || []);
	}

	protected getKey(): FilterType<K, DocId> {
		return '_id' as FilterType<K, DocId>;
	}

	protected abstract query(ids: readonly DocId[]): Promise<K[]>;
}
