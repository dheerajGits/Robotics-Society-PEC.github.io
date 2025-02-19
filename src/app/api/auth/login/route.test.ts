/** @format */

import User from '@/models/User';
import '@jest/globals';
import bcrypt from 'bcryptjs';
import {NextRequest} from 'next/server';
import {POST} from './route';

// Mock dependencies
jest.mock('@/utils/dbConnect');
jest.mock('@/models/User');
jest.mock('bcryptjs');

describe('POST /api/auth/login', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 404 if user is not found', async () => {
		// Mock User.findOne to return null
		(User.findOne as jest.Mock).mockResolvedValue(null);

		const request = new NextRequest('http://localhost:3000/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({email: 'test@example.com', password: 'password123'}),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(404);
		expect(data.message).toBe('User not found');
	});

	it('should return 401 if password is invalid', async () => {
		// Mock found user
		const mockUser = {
			email: 'test@example.com',
			password: 'hashedPassword',
		};

		(User.findOne as jest.Mock).mockResolvedValue(mockUser);
		(bcrypt.compare as jest.Mock).mockResolvedValue(false);

		const request = new NextRequest('http://localhost:3000/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({email: 'test@example.com', password: 'wrongpassword'}),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(401);
		expect(data.message).toBe('Invalid Credentials');
	});

	it('should return 200 and user data if login is successful', async () => {
		// Mock found user
		const mockUser = {
			email: 'test@example.com',
			password: 'hashedPassword',
			name: 'Test User',
		};

		(User.findOne as jest.Mock).mockResolvedValue(mockUser);
		(bcrypt.compare as jest.Mock).mockResolvedValue(true);

		const request = new NextRequest('http://localhost:3000/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({email: 'test@example.com', password: 'correctpassword'}),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.message).toBe('Login successful');
		expect(data.password).toBeNull();
		expect(data.email).toBe(mockUser.email);
		expect(data.name).toBe(mockUser.name);
	});
});
