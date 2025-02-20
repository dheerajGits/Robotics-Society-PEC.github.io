/** @format */

import { Branch } from "@/models/User";

export default interface SignupRequestBody {
	email: string;
	password: string;
	name: string;
	ph_number: string;
	sid: string;
	batch: number;
	branch: Branch;
}
