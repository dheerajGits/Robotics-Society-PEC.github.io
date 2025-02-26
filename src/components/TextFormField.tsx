/** @format */

export interface TextFormFieldProps {
	readonly type: 'text' | 'tel' | 'email' | 'password';
	readonly label: string;
	readonly required?: boolean;
	readonly placeholder: string;
	readonly emoji: string;
	readonly autoComplete?: 'tel' | 'email' | 'new-password' | 'current-password' | 'given-name' | 'off';
	readonly value: string | number | readonly string[] | undefined;
	readonly onChange: (value: string) => void;
}

export default function FormField({label, required = true, placeholder, emoji, autoComplete,type,value,onChange}: TextFormFieldProps) {
	return (
		<div className='relative'>
			<input
				type={type}
				aria-label={label}
				required={required}
				placeholder={`${placeholder} ${emoji}`}
				className='w-full p-3 rounded-full bg-[#4b4b8f] text-white placeholder-gray-300 pl-5 focus:bg-[#4b4b8f]'
				autoComplete={autoComplete}
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	);
}
