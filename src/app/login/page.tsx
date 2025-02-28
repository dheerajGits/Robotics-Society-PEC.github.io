/** @format */

'use client';

import {useAuth} from '@/contexts/auth/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import TextFormField from '../../components/TextFormField';

export default function LoginPage() {
	const {loginData, setLoginData, loginError, handleLogin} = useAuth();

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#1a1633] p-4'>
			<div className='w-full max-w-md space-y-8'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-white flex items-center justify-center gap-2'>
						Login <Image src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔐</text></svg>" alt='lock' width={24} height={24} />
					</h1>
				</div>

				<form onSubmit={handleLogin} autoComplete='on' className='mt-8 space-y-6'>
					<div className='space-y-4'>
						<TextFormField type='email' label='Email address' placeholder='email' emoji='✉️' autoComplete='email' value={loginData.email} onChange={value => setLoginData({email: value})} />

						<TextFormField type='password' label='Password' placeholder='password' emoji='🔑' autoComplete='current-password' value={loginData.password} onChange={value => setLoginData({password: value})} />
					</div>

					{loginError && <p className='text-red-500 text-sm text-center'>{loginError}</p>}

					<div className='flex items-center justify-between relative'>
						<div className='absolute left-1/2 -translate-x-1/2'>
							<button type='submit' className='w-32 bg-[#443c70] text-white rounded-full px-4 py-2 hover:bg-[#554d81] transition-colors duration-200'>
								Login 🔒
							</button>
						</div>
						<div className='ml-auto'>
							<button type='button' className='text-sm text-gray-300 hover:text-white'>
								<Link href='/forgot-password'>forgot password 😅</Link>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
