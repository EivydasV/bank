import { DocId, OmitBaseType } from '@app/shared/db';

export interface SaverInterface<TInput, TOutput> {
	save(input: OmitBaseType<TInput>): Promise<TOutput>;
	save(input: Partial<TInput>, id: DocId): Promise<TOutput | null>;
}
