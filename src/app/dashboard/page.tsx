/** @format */

import Image from 'next/image';
import Link from 'next/link';
            import {user as userData} from '@/raw data/Dashboard';


const Dashboard = () => {
      const user=userData;
	return (
		<div className='min-h-screen bg-[#1a1b2e] p-6'>
			<div className='bg-[#2a2b3d] rounded-lg p-6 mb-8'>
				<div className='text-white text-base mb-2 text-right'>Member since {user.memberSince}</div>
				<div className='flex items-center gap-6'>
					<div className='relative w-24 h-24'>
						<Image src={user.avatar} alt='Profile picture' width={96} height={96} className='rounded-full' />
					</div>

					<div className='flex-1'>
						<h2 className='text-white text-2xl font-semibold mb-1'>{user.name}</h2>
						<p className='text-white text-base mb-1'>{user.batch}</p>
						<p className='text-white text-base'>{user.department}</p>
						<div className='flex gap-4 mt-4'>
							{user.socialLinks.map(({image, url}) => (
								<Link key={url} href={url} className='text-white-400 hover:text-white transition-colors'>
									<Image src={image} alt={image} width={24} height={24} />
								</Link>
							))}
						</div>
					</div>
				</div>
				<div className='flex justify-end mt-4'>
					<button type="button" className='bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700'>Modify Details</button>
				</div>
			</div>

			<div className='mb-8'>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-white text-lg font-semibold flex items-center gap-2'>
						Your Projects
						<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
						</svg>
					</h3>
					<button type='button' className='bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700'>
						Add New
					</button>
				</div>
				<div className='bg-[#4f46e5] rounded-lg h-48'></div>
			</div>

			<div>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-white text-lg font-semibold flex items-center gap-2'>
						Your Competitions
						<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
							/>
						</svg>
					</h3>
					<button className='bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700'>Add New</button>
				</div>
				<div className='bg-[#4f46e5] rounded-lg h-48'></div>
			</div>
		</div>
	);
};

export default Dashboard