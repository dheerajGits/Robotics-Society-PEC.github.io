/** @format */

import { Branch } from "@/models/User";


export interface SelectFormFieldProps {
	readonly label: string;
	readonly required?: boolean;
	readonly placeholder: string;
	readonly emoji: string;
	readonly value: string;
	readonly onChange: (value: string) => void;
}

export default function SelectFormField({label, required = true, placeholder, emoji, value, onChange}: SelectFormFieldProps) {
	return (
		<select aria-label={label} required={required} className='w-full px-5 rounded-full bg-[#4b4b8f] text-white placeholder-gray-300' value={value} onChange={e => onChange(e.target.value)}>
			<option value=''>{`${placeholder} ${emoji}`}</option>
			{Object.keys(Branch).map(option => (
				<option key={option} value={option} onClick={() => onChange(option)}>
					{option}
				</option>
			))}
		</select>
	);
}
