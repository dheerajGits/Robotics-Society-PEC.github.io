/** @format */

import type {NextApiRequest, NextApiResponse} from 'next';
import User from '@/models/User';
import getDbConnection from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import {validateSignupRequest} from '@/utils/valid';

export interface SignupRequestBody {
	email: string;
	password: string;
	name: string;
	ph_number: number;
	sid: number;
	batch: number;
	branch: string;
}

interface ApiResponse {
	message: string;
}

if (!process.env.BCRYPT_ENCRYPTION_ROUNDS) {
	throw new Error('BCRYPT_ENCRYPTION_ROUNDS is not defined');
}
const BCRYPT_ENCRYPTION_ROUNDS = parseInt(process.env.BCRYPT_ENCRYPTION_ROUNDS);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>): Promise<void> {
	//getting only required fields from request body
    const {email, password, name, ph_number, sid, batch, branch}:SignupRequestBody=req.body
    if (req.method !== 'POST') {
		res.status(405).json({message: 'Method not allowed'});
		return;
	}
	try {
		validateSignupRequest(req.body);
	} catch (error) {
		res.status(400).json({message: (error as Error).message});
		return;
	}
	await getDbConnection();
	const existingUser = await User.findOne({email});
	if (existingUser) {
		res.status(400).json({message: 'Email already in use'});
		return;
	}

	const hashedPassword = await bcrypt.hash(password, BCRYPT_ENCRYPTION_ROUNDS);
	const newUser = new User({email, name, ph_number, sid, batch, branch, password: hashedPassword});
	await newUser.save();

	res.status(201).json({message: 'User registered successfully'});
}
