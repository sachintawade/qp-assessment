import express, { Request, Response } from "express";
import { listOfGroceries } from "../controllers/groceriesController/listOfGroceries";
import { auth } from "../middlewares/auth";
import { addGroceries } from "../controllers/groceriesController/addGroceries";
import { checkRoleAuth } from "../utils/checkRoleAuth";
import { updateGroceries } from "../controllers/groceriesController/updateGroceries";
import { deleteGroceries } from "../controllers/groceriesController/deleteGroceries";

const router = express.Router();

router.get('/', auth, async (req: Request, res: Response) => {
    try {
        await checkRoleAuth(req, ['ADMIN', 'END_USER'])
        const data = await listOfGroceries(req, res);
        res.status(200).send(data)
    } catch (error: any) {
        res.status(409).send({ message: error.message })
    }
});

router.post('/', auth, async (req: Request, res: Response) => {
    try {
        await checkRoleAuth(req, ['ADMIN'])
        const data = await addGroceries(req, res);
        res.status(201).send(data)
    } catch (error: any) {
        res.status(401).send({ message: error.message })
    }
});

router.put('/:itemId', auth, async (req: Request, res: Response) => {
    try {
        await checkRoleAuth(req, ['ADMIN'])
        const data = await updateGroceries(req, res);
        res.status(202).send(data)
    } catch (error: any) {
        res.status(404).send({ message: error.message })
    }
});

router.delete('/:itemId', auth, async (req: Request, res: Response) => {
    try {
        await checkRoleAuth(req, ['ADMIN'])
        const data = await deleteGroceries(req, res);
        res.status(200).send(data)
    } catch (error: any) {
        res.status(404).send({ message: error.message })
    }
});

export default router;
