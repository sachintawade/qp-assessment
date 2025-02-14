import { Request, Response } from "express";
import { commonQueries } from "../../utils/commonQueries";
import { QueryTypes } from "sequelize";


export const deleteGroceries = async (req: Request, res: Response) => {
    try {
        console.log('Started execution of deleteGroceries function', req.params)

        const { itemId } = req.params;

        const checkGroceryExist = await commonQueries({ itemId }, `SELECT id FROM grocery_items WHERE id = :itemId AND is_deleted = false`, QueryTypes.SELECT);
        console.log('checkGroceryExist', checkGroceryExist);


        if (!checkGroceryExist.length) throw new Error('GROCERY_NOT_FOUND');

        await commonQueries({ itemId }, `UPDATE grocery_items SET is_deleted = true WHERE id = :itemId AND is_deleted = false`, QueryTypes.UPDATE);

        console.log('End execution of deleteGroceries function')
        return { message: 'GROCERY_DELETED_SUCCESSFULLY' }
    } catch (error) {
        console.log('Error occured in deleteGroceries', error)
        throw error;
    }
}