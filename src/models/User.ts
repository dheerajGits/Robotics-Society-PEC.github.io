import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    ph_number: number;
    sid: number;
    batch: number;
    branch: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    ph_number: { type: Number, required: true, unique: true },
    sid: { type: Number, required: true, unique: true },
    batch: { type: Number, required: true },
    branch: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);