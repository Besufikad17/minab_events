export function required(value: string) {
	return value ? true : 'This field is required';
}

export function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
