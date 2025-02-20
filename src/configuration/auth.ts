if(!process.env.AUTH_COOKIE_NAME){
    throw new Error("AUTH_COOKIE_NAME must be defined")
}
export const AUTH_COOKIE_NAME=process.env.AUTH_COOKIE_NAME

if (!process.env.BCRYPT_ENCRYPTION_ROUNDS) {
    throw new Error('BCRYPT_ENCRYPTION_ROUNDS is not defined');
}

export const BCRYPT_ENCRYPTION_ROUNDS = parseInt(process.env.BCRYPT_ENCRYPTION_ROUNDS);

export const AUTH_COOKIE_EXPIRATION_TIME = 10 * 1440 * 60;