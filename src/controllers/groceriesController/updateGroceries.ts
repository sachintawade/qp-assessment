import { Request, Response } from "express";
import { commonQueries } from "../../utils/commonQueries";
import { QueryTypes } from "sequelize";


export const updateGroceries = async (req: Request, res: Response) => {
    try {
        console.log('Started execution of updateGroceries function', req.body)

        const { itemId } = req.params

        const { groceryName = null, price = 0, quantity = 0 } = req.body;

        const checkGroceryExist = await commonQueries({ itemId }, `SELECT name, price AS groceryPrice, quantity AS groceryQuantity FROM grocery_items WHERE id = :itemId`, QueryTypes.SELECT);

        if (!checkGroceryExist.length) throw new Error('GROCERY_NOT_FOUND');

        const [{ name, groceryPrice, groceryQuantity }] = checkGroceryExist;

        const updateGroceriesQuery = `UPDATE grocery_items 
                        SET name = :groceryName, 
                        price = :price,
                        quantity = :quantity
                        WHERE id = :itemId`;

        const replacements = {
            itemId,
            price: price || groceryPrice,
            quantity: quantity || groceryQuantity,
            groceryName: groceryName || name,
        }

        const updateGroceriesData = await commonQueries(replacements, updateGroceriesQuery, QueryTypes.UPDATE);

        if (!updateGroceriesData?.length) return { message: 'RECORD_NOT_ADDED' };

        console.log('End execution of updateGroceries function')

        return { message: 'GROCERY_UPDATED_SUCCESSFULLY' }

    } catch (error) {
        console.log('Error occured in updateGroceries', error)
        throw error;
    }
}