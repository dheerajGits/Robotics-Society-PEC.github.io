import { SignupRequestBody } from "@/app/api/auth/signup";

export const validateSignupRequest=(body:SignupRequestBody)=>{
    const {batch,branch,email,name,password,ph_number,sid}=body
    if(!body || !batch || !branch || !email || !name || !password || !ph_number || !sid )
        return false
    String()
}