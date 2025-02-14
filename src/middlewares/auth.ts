import { verifyToken } from "./jwtAuthentication"


export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req?.headers?.authorization;
        const user = await verifyToken(token);
        req.user = user;
        next();
    } catch (error: any) {
        console.log('error in auth', error)
        const message = error?.message?.includes('jwt expired') ? 'TOKEN_EXPIRED' : error.message;
        return res.status(401).send({ message })
    }
}