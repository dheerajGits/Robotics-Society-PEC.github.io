import {NextRequest, NextResponse} from 'next/server';
import getDbConnection from '@/utils/dbConnect';
import { findUserByEmail } from '@/services/User';
import { AUTH_COOKIE_EXPIRATION_TIME, AUTH_COOKIE_NAME } from '@/configuration/auth';
import { validatePassword } from '@/services/Encryption';


export async function POST(request: NextRequest) {
	const {email, password} = await request.json();
    await getDbConnection()
	const user = await findUserByEmail(email)
	if (!user)	return NextResponse.json({message: 'User not found'}, {status: 404});
	const isPasswordValid = await validatePassword(password,user.password);
	if (!isPasswordValid) return NextResponse.json({message: 'Invalid Credentials'}, {status: 401});

	const response=NextResponse.json({message: 'Login successful'}, {status: 200})
	response.cookies.set(AUTH_COOKIE_NAME,JSON.stringify({...user,password:null,_id:null}),{
		httpOnly: true,
		secure: true,
		expires:AUTH_COOKIE_EXPIRATION_TIME
	})
	return response
}