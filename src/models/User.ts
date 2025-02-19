/** @format */

import mongoose, {Document, Schema} from 'mongoose';

// Define the Branch enum
enum Branch {
	CSE = 'CSE',
	CIVIL = 'CIVIL',
	AERO = 'AERO',
	MECH = 'MECH',
	ELEC = 'ELEC',
	ECE = 'ECE',
	CSE_DS = 'CSE_DS',
	CSE_AI = 'CSE_AI',
	META = 'META',
	PROD = 'PROD',
	VLSI = 'VLSI',
	MNC = 'MNC',
	BDESG = 'BDESG',
}

interface IUser extends Document {
	email: string;
	password: string;
	name: string;
	ph_number: number;
	sid: number;
	batch: number;
	branch: Branch;
}

const UserSchema = new Schema<IUser>({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	ph_number: {type: Number, required: true, unique: true},
	sid: {type: Number, required: true, unique: true},
	batch: {type: Number, required: true},
	branch: {
		type: String,
		required: true,
		enum: Object.values(Branch),
		uppercase: true,
	},
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
