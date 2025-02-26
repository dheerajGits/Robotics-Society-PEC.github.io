/** @format */

import Image from 'next/image';

export interface PasswordFormFieldProps {
	readonly showPassword: boolean;
	readonly setShowPassword: (showPassword: boolean) => void;
}

export default function PasswordFormField({showPassword, setShowPassword}: PasswordFormFieldProps) {
	return (
		<div className='relative'>
			<input
				type={showPassword ? 'text' : 'password'}
				id='password'
				name='password'
				className='w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				placeholder='Enter your password'
				required
				minLength={8}
				aria-describedby='password-requirements'
			/>
			<button type='button' className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full' onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
				<Image src={showPassword ? '/eye-off.png' : '/eye.png'} alt='' width={20} height={20} />
			</button>
			<p id='password-requirements' className='text-sm text-gray-600 mt-1'>
				Password must be at least 8 characters long
			</p>
		</div>
	);
}
