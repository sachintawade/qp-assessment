import express, { Request, Response } from "express";
import { createOrder } from "../orders/createOrder";
import { auth } from "../middlewares/auth";
import { checkRoleAuth } from "../utils/checkRoleAuth";

const router = express.Router();;

router.post('/', auth, async (req: Request, res: Response) => {
    try {
        await checkRoleAuth(req, ['END_USER'])
        const data = await createOrder(req, res);
        res.status(201).send(data)
    } catch (error: any) {
        res.send({ message: error.message })
    }
})

export default router;
