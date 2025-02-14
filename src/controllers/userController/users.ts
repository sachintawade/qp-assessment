import { Request, Response } from "express";
import { commonQueries } from "../../utils/commonQueries";
import { QueryTypes } from "sequelize";
import { hashPassword } from "../../utils/commonPassword";


export const createUser = async (req: Request, res: Response) => {
    try {
        console.log('Started execution of createUser function', req.body)

        const { email, name, password, role } = req.body;

        const checkExistingUser = await commonQueries({ email },
            `SELECT id FROM users WHERE email = :email`,
            QueryTypes.SELECT);

        if (checkExistingUser.length) throw new Error('BAD_REQUEST')

        const addUserQuery = 'INSERT INTO users (email, name, password, role) VALUES (:email, :name, :hashPassord, :role)'

        const replacements = {
            email,
            name,
            hashPassord: await hashPassword(password),
            role
        };

        const result = await commonQueries(replacements, addUserQuery, QueryTypes.INSERT);


        if (!result?.length) return { message: 'RECORD_NOT_ADDED' };
        console.log('End execution of createUser function')
        return { message: 'USER_ADDED_SUCCESSFULLY' }
    } catch (error) {
        console.log('Error occured in createUser', error)
        throw error;
    }
}

