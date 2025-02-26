/** @format */

import LoginRequestBody from "@/types/LoginRequestBody";
import SignupRequestBody from "@/types/SignupRequestBody";

export interface AuthContextType {
	loginData: LoginRequestBody;
	setLoginData: (data: Partial<LoginRequestBody>) => void;
	loginError: string;
	setLoginError: (error: string) => void;
	handleLogin: (e: React.FormEvent) => Promise<void>;

	signupData: SignupRequestBody;
	setSignupData: (data: Partial<SignupRequestBody>) => void;
	signupError: string;
	setSignupError: (error: string) => void;
	handleSignup: (e: React.FormEvent) => Promise<void>;
}
