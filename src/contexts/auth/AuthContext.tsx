/** @format */

'use client';

import {Branch} from '@/models/User';
import LoginRequestBody from '@/types/LoginFrontendRequest';
import SignupFrontendRequest from '@/types/SignupFrontendRequest';
import {useRouter} from 'next/navigation';
import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {AuthContextType} from './AuthTypes';

const initialLoginData: LoginRequestBody = {
	email: '',
	password: '',
};

const initialSignupData: SignupFrontendRequest = {
	name: '',
	email: '',
	ph_number: 0,
	sid: 0,
	password: '',
	batch: 0,
	branch: 'CSE' as Branch,
	confirmPassword: '',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: Readonly<{children: React.ReactNode}>) {
	const router = useRouter();

	const [loginData, setLoginData] = useState<LoginRequestBody>(initialLoginData);
	const [loginError, setLoginError] = useState('');

	const [signupData, setSignupData] = useState<SignupFrontendRequest>(initialSignupData);
	const [signupError, setSignupError] = useState('');

	const setSignupDataCallback = useCallback((data: Partial<SignupFrontendRequest>) => {
		setSignupData(prev => ({...prev, ...data}));
	}, []);

	const setLoginDataCallback = useCallback((data: Partial<LoginRequestBody>) => {
		setLoginData(prev => ({...prev, ...data}));
	}, []);

	const handleLogin = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setLoginError('');

			try {
				const response = await fetch('/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});

				const data = await response.json();

				if (!response.ok) throw new Error(data.message || 'Login failed');

				router.push('/dashboard');
			} catch (err: unknown) {
				setLoginError(err instanceof Error ? err.message : 'An error occurred');
			}
		},
		[loginData, router]
	);

	const handleSignup = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			const {batch,branch,password,ph_number,sid,name,email,confirmPassword} = signupData;

			if (password !== confirmPassword) {
				setSignupError('Passwords do not match');
				return;
			}

			try {
				console.log('Submitting signup data:', signupData);
				const response = await fetch('/api/auth/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({batch,branch,password,ph_number,sid,name,email}),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message);
				}

				router.push('/login');
			} catch (err) {
				setSignupError(err instanceof Error ? err.message : 'Something went wrong');
			}
		},
		[signupData, router]
	);

	const value = useMemo(
		() => ({
			loginData,
			setLoginData: setLoginDataCallback,
			loginError,
			setLoginError,
			handleLogin,
			signupData,
			setSignupData: setSignupDataCallback,
			signupError,
			setSignupError,
			handleSignup,
		}),
		[loginData, loginError, signupData, signupError, handleLogin, handleSignup, setSignupDataCallback, setLoginDataCallback]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
	return context;
}
