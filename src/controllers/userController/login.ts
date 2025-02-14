import { Request, Response } from "express";
import { commonQueries } from "../../utils/commonQueries";
import { QueryTypes } from "sequelize";
import { comparePassword } from "../../utils/commonPassword";
import { signToken } from "../../middlewares/jwtAuthentication";


export const login = async (req: Request, res: Response) => {
    try {
        console.log('Started execution of login function', req.body)

        const { email, password } = req.body;

        const checkExistingUser = await commonQueries({ email },
            `SELECT *, password AS hashPassword FROM users WHERE email = :email`,
            QueryTypes.SELECT);

        if (!checkExistingUser.length) throw new Error('USER_NOT_FOUND')

        const [{ hashPassword }] = checkExistingUser;


        await comparePassword(password, hashPassword);

        const authToken = await signToken(checkExistingUser[0])

        console.log('End execution of login function', authToken)
        return { authToken }
    } catch (error) {
        // console.log('Error occured in login', error)
        throw error;
    }
}

