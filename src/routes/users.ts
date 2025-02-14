import express, { Request, Response } from "express";
import { createUser } from "../controllers/userController/users";
import { login } from "../controllers/userController/login";

const router = express.Router();;

router.post('/', async (req: Request, res: Response) => {
    try {
        const data = await createUser(req, res);
        res.status(201).send(data)
    } catch (error: any) {
        res.status(409).send({ message: error.message })
    }
})


router.post('/login', async (req: Request, res: Response) => {
    try {
        const data = await login(req, res);
        res.status(201).send(data)
    } catch (error: any) {
        console.log('error in login', error)
        res.status(401).send({ message: error.message })
    }
})

export default router;
