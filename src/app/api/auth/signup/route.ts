/** @format */

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import User from '@/models/User';
import getDbConnection from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import {validateSignupRequest} from '@/utils/valid';

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

		const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ENCRYPTION_ROUNDS || '10'));

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

		return NextResponse.json({message: 'User registered successfully'}, {status: 201});
	} catch (error) {
		return NextResponse.json({message: (error as Error).message}, {status: 400});
	}
}
