/** @format */

import {Branch} from '@/models/User';

type SignupFrontendRequest = {
	name: string;
	email: string;
	ph_number: number;
	sid: number;
	confirmPassword: string;
	password: string;
	batch: number;
	branch: Branch;
};

export default SignupFrontendRequest;
