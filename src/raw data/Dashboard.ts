/** @format */

interface SocialLink {
	image: string;
	url: string;
}


interface UserData {
	name: string;
	batch: string;
	department: string;
	memberSince: string;
	avatar: string;
	socialLinks: SocialLink[];
}

export const user: UserData = {
	name: 'Red Hair Shanks',
	batch: '2026 batch',
	department: 'Electronics and Communication Eng',
	memberSince: '2023',
	avatar: 'https://ui-avatars.com/api/?name=Red+Hair+Shanks&background=random&size=128',
	socialLinks: [
		{image: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg', url: 'https://instagram.com/ayush_d2006'},
		{image: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg', url: 'https://youtube.com/@ayush_d2006'},
		{image: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg', url: 'https://linkedin.com/in/ayush_d2006'},
	],
};
