
import User, { Branch, UserDocument } from '@/models/User';

export const findUserByEmail=(email:string):Promise<UserDocument|null>=>{
    return User.findOne({email});
}
export const saveUser=(email:string,name:string,ph_number:number,sid:number,batch:number,branch:Branch,hashedPassword:string):Promise<UserDocument|null>=>{
    return new User({
        email,
        name,
        ph_number,
        sid,
        batch,
        branch,
        password: hashedPassword,
    }).save();
}