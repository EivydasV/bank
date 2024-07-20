export type FilterType<TObj, Type> = {
	[K in keyof TObj]: TObj[K] extends Type ? K : never;
}[keyof TObj];
