/** @format */

import {AUTH_COOKIE_EXPIRATION_TIME, AUTH_COOKIE_NAME} from '@/configuration/auth';
import {validatePassword} from '@/services/Encryption';
import {findUserByEmail} from '@/services/User';
import LoginRequestBody from '@/types/LoginRequestBody';
import getDbConnection from '@/utils/dbConnect';
import {NextRequest, NextResponse} from 'next/server';
export async function POST(request: NextRequest) {
	const {email, password}: LoginRequestBody = await request.json();
	await getDbConnection();
	const user = await findUserByEmail(email);
	if (!user) return NextResponse.json({message: 'User not found'}, {status: 404});
	const isPasswordValid = await validatePassword(password, user.password);
	if (!isPasswordValid) return NextResponse.json({message: 'Invalid Credentials'}, {status: 401});

	const response = NextResponse.json({message: 'Login successful'}, {status: 200});
	response.cookies.set(AUTH_COOKIE_NAME, JSON.stringify({...user, password: null, _id: null}), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		expires: new Date(Date.now() + AUTH_COOKIE_EXPIRATION_TIME * 1000),
	});
	return response;
}
