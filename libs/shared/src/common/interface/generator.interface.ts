export interface GeneratorInterface<TInput, TOutput> {
	generate(input: TInput): TOutput;
}
