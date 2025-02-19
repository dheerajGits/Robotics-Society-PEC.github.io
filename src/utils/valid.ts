/** @format */

import {SignupRequestBody} from '@/app/api/auth/signup';
import {ValidationError} from '@/exceptions/ValidationError';

export const validateSignupRequest = (body: SignupRequestBody): void => {
	const {batch, branch, email, name, password, ph_number, sid} = body;

	if (!body || !batch || !branch || !email || !name || !password || !ph_number || !sid) {
		throw new ValidationError('All fields are required');
	}

	const currentYear = new Date().getFullYear();
	if (batch < 2019 || batch > currentYear + 1) {
		throw new ValidationError(`Batch year must be between 2019 and ${currentYear + 1}`);
	}

	const sidStr = sid.toString();
	if (sidStr.length !== 8) {
		throw new ValidationError('Student ID must be 8 digits long');
	}

	const sidYear = parseInt(sidStr.substring(0, 2));
	const batchYear = batch % 100;
	if (batch >= 2020 && sidYear !== batchYear) {
		throw new ValidationError('Student ID year must match batch year');
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new ValidationError('Invalid email format');
	}

	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(ph_number.toString())) {
		throw new ValidationError('Phone number must be 10 digits');
	}

	if (password.length < 6) {
		throw new ValidationError('Password must be at least 6 characters long');
	}
};
