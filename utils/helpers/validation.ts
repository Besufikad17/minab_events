export function required(value: string) {
	return value ? true : 'This field is required';
}

export function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhoneNumber(value: string) {
	return /(^[0-9]{10}$)/.test(value);
}
