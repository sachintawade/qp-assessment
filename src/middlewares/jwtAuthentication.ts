import jwt from 'jsonwebtoken';
const SECRETE_KEY = '40Kh5rp3FmDNTKTB1TycizUhrTjVUnbO';
export const signToken = async (req: any) => {
    try {
        const payload = {
            id: req.id,
            email: req.email,
            name: req.name,
            role: req.role,
        };
        const token = jwt.sign(payload, SECRETE_KEY, { expiresIn: '1h' });

        return token;

    } catch (error) {
        console.log('error=', error)
        throw new Error('SIGN_IN_ERROR');
    }
}


export const verifyToken = async (authToken: string) => {
    try {
        if (!authToken) throw new Error('TOKEN_IS_MISSING');

        const token = authToken?.split(' ')?.[1]

        if (!token) throw new Error('UNAUTHORIZED');

        const decodedData = jwt.verify(token, SECRETE_KEY);

        return decodedData;

    } catch (error) {
        console.log('error=', error)
        throw error;
    }
}