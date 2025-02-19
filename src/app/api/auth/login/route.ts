import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import getDbConnection from '@/utils/dbConnect';

export async function POST(request: NextRequest) {
	const {email, password} = await request.json();
      await getDbConnection()
	const user = await User.findOne({email});
	if (!user) {
		return NextResponse.json({message: 'User not found'}, {status: 404});
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return NextResponse.json({message: 'Invalid Credentials'}, {status: 401});
	}

	return NextResponse.json({message: 'Login successful',...user,password:null,_id:null}, {status: 200});
}

