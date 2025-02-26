/** @format */

import Image from 'next/image';

export interface PasswordFormFieldProps {
	readonly showPassword: boolean;
	readonly setShowPassword: (showPassword: boolean) => void;
	readonly value: string;
	readonly onChange: (value: string) => void;
	readonly placeholder: string;
	readonly name: string;
	readonly autoComplete?: string;
}

export default function PasswordFormField({showPassword, setShowPassword, value, onChange, placeholder, name, autoComplete}: PasswordFormFieldProps) {
	return (
		<div className='relative'>
			<input
				type={showPassword ? 'text' : 'password'}
				id={name}
				name={name}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				placeholder={placeholder}
				required
				minLength={8}
				autoComplete={autoComplete}
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
