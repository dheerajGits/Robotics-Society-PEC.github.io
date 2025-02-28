/** @format */

'use client';

import {useAuth} from '@/contexts/auth/AuthContext';
import {Branch} from '@/models/User';
import Image from 'next/image';
import SelectFormField, {SelectFormFieldProps} from '../../components/SelectFormField';
import TextFormField, {TextFormFieldProps} from '../../components/TextFormField';

export default function SignupPage() {
	const {signupData, setSignupData, signupError, handleSignup} = useAuth();
	const branchField: SelectFormFieldProps[] = [
		{
			label: 'Branch',
			placeholder: 'Branch',
			emoji: '📚',
			value: signupData.branch,
			onChange: value => setSignupData({branch: value as Branch}),
		},
	];
	const batchFields = [
		{
			name: 'batch',
			type: 'text' as const,
			label: 'Batch',
			placeholder: 'batch(eg.2026)',
			emoji: '📅',
			className: 'w-1/2',
			value: signupData.batch,
			onChange: (value: string) => setSignupData({batch: Number(value)}),
		},
	] as const;

	const formFields: TextFormFieldProps[] = [
		{
			type: 'text' as const,
			label: 'Full name',
			placeholder: 'full name',
			emoji: '😊',
			autoComplete: 'given-name',
			value: signupData.name,
			onChange: value => setSignupData({name: value}),
		},
		{
			type: 'tel' as const,
			label: 'Phone number',
			placeholder: 'phone number',
			emoji: '📞',
			autoComplete: 'tel',
			value: signupData.ph_number,
			onChange: value => setSignupData({ph_number: Number(value)}),
		},
		{
			type: 'email' as const,
			label: 'Email address',
			placeholder: 'email',
			emoji: '📧',
			autoComplete: 'email',
			value: signupData.email,
			onChange: value => setSignupData({email: value}),
		},
		{
			type: 'text' as const,
			label: 'Student ID',
			placeholder: 'sid',
			emoji: '🎫',
			autoComplete: 'off',
			value: signupData.sid,
			onChange: value => setSignupData({sid: Number(value)}),
		},
		{
			type: 'password' as const,
			label: 'Password',
			placeholder: 'password',
			emoji: '🔑',
			autoComplete: 'new-password',
			value: signupData.password,
			onChange: value => setSignupData({password: value}),
		},
		{
			type: 'password' as const,
			label: 'Confirm Password',
			placeholder: 'confirm password',
			emoji: '🔐',
			autoComplete: 'new-password',
			value: signupData.confirmPassword,
			onChange: value => setSignupData({confirmPassword: value}),
		},
	] as const;
	return (
		<div className='min-h-screen bg-[#1a1a3a] flex flex-col items-center justify-center p-4'>
			<div className='w-full max-w-md space-y-6'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold text-white flex items-center justify-center gap-2'>
						Register <Image src='/lock-icon.png' alt='Lock icon' width={24} height={24} />
					</h1>
				</div>

				<form onSubmit={handleSignup} className='space-y-4'>
					{formFields.map(field => (
						<TextFormField key={field.label} {...field} />
					))}

					<div className='flex gap-4'>
						{batchFields.map(field => (
							<TextFormField key={field.label} {...field} />
						))}
						{branchField.map(field => (
							<SelectFormField key={field.label} {...field} />
						))}
					</div>

					{signupError && <p className='text-red-500 text-sm text-center'>{signupError}</p>}
					<div className='items-center flex justify-center'>
						<button type='submit' className='w-1/2 p-3 rounded-lg bg-[#6b6baf] hover:bg-[#5a5a9a] text-white font-semibold transition-colors'>
							Register ❤️
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
