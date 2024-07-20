export interface ValidatorInterface<TInput> {
	validate(input: TInput): Promise<void> | void;
}
