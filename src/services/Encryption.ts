import bcrypt from "bcryptjs"

export const validatePassword=(password1:string,password2:string):Promise<boolean>=>{
    return bcrypt.compare(password1,password2)
}