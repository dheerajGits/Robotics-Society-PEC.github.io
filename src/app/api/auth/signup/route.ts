/** @format */

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import getDbConnection from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import {validateSignupRequest} from '@/utils/valid';
import SignupRequestBody from '@/types/SignupRequestBody';
import { findUserByEmail, saveUser } from '@/services/User';
import { BCRYPT_ENCRYPTION_ROUNDS } from '@/configuration/auth';



export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {email, password, name, ph_number, sid, batch, branch}:SignupRequestBody = body;

		validateSignupRequest(body);

		await getDbConnection();
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return NextResponse.json({message: 'Email already in use'}, {status: 400});
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_ENCRYPTION_ROUNDS);

		const newUser=await saveUser(email,name,ph_number,sid,batch,branch,hashedPassword)

		return NextResponse.json({message: 'User registered successfully', ...newUser, password: null}, {status: 201});
	} catch (error) {
		console.log(error);
		return NextResponse.json({message: (error as Error).message}, {status: 400});
	}
}