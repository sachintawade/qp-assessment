import bcrypt from 'bcrypt';

const saltRounds = 5;

export const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
}


export const comparePassword = async (password: string, hashedPassword: string) => {
    const match = await bcrypt.compare(password, hashedPassword);

    if (match) {
        console.log('Password is correct!');
        return match;
    } else {
        console.log('Password is incorrect.');
        throw new Error('INVALID_CREDENTIALS')
    }
}