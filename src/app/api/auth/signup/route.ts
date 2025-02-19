/** @format */

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import User from '@/models/User';
import getDbConnection from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import {validateSignupRequest} from '@/utils/valid';

if (!process.env.BCRYPT_ENCRYPTION_ROUNDS) {
	throw new Error('BCRYPT_ENCRYPTION_ROUNDS is not defined');
}
const BCRYPT_ENCRYPTION_ROUNDS = parseInt(process.env.BCRYPT_ENCRYPTION_ROUNDS);
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {email, password, name, ph_number, sid, batch, branch} = body;

		// Validate request
		validateSignupRequest(body);

		await getDbConnection();
		const existingUser = await User.findOne({email});
		if (existingUser) {
			return NextResponse.json({message: 'Email already in use'}, {status: 400});
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_ENCRYPTION_ROUNDS);

		const newUser = new User({
			email,
			name,
			ph_number,
			sid,
			batch,
			branch,
			password: hashedPassword,
		});
		await newUser.save();

		return NextResponse.json({message: 'User registered successfully', ...newUser, password: null}, {status: 201});
	} catch (error) {
		console.log(error);
		return NextResponse.json({message: (error as Error).message}, {status: 400});
	}
}
