/** @format */

import LoginRequestBody from '@/types/LoginFrontendRequest';
import SignupFrontendRequest from '@/types/SignupFrontendRequest';

export interface AuthContextType {
	loginData: LoginRequestBody;
	setLoginData: (data: Partial<LoginRequestBody>) => void;
	loginError: string;
	setLoginError: (error: string) => void;
	handleLogin: (e: React.FormEvent) => Promise<void>;

	signupData: SignupFrontendRequest;
	setSignupData: (data: Partial<SignupFrontendRequest>) => void;
	signupError: string;
	setSignupError: (error: string) => void;
	handleSignup: (e: React.FormEvent) => Promise<void>;
}
