import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import getDbConnection from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';

export interface SignupRequestBody {
    email: string;
    password: string;
    name:string;
    ph_number:number;
    sid:number
    batch:number
    branch:string
}

interface ApiResponse {
    message: string;
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<ApiResponse>): Promise<void> {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    await getDbConnection();
    const {email}:SignupRequestBody=req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: 'Email already in use' });
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
}
