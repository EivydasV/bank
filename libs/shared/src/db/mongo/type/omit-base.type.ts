export type OmitBaseType<T> = Omit<T, '_id' | 'createdAt' | 'updatedAt'>;
