export const getChanges = (
	original: Record<string, unknown>,
	updated: Record<string, unknown>,
): Record<string, unknown> => {
	const changes: Record<string, unknown> = {};

	for (const key in updated) {
		if (updated[key] !== original[key]) {
			changes[key] = updated[key];
		}
	}

	return changes;
};
