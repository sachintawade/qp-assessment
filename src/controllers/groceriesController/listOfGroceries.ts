import { Request, Response } from "express";
import { commonQueries } from "../../utils/commonQueries";
import { QueryTypes } from "sequelize";


export const listOfGroceries = async (req: Request, res: Response) => {
    try {
        console.log('Started execution of listOfGroceries function', req.query)

        // const { itemId, category, search } = req.query;

        // we need to add seach and conditions and pagination - To Do

        const groceryItems = await commonQueries({},
            `SELECT 
                gi.id AS itemId,
                cat.name AS category,
                gi.name AS groceryName,
                gi.price AS price,
                gi.quantity AS quantity 
                FROM grocery_items gi 
                INNER JOIN categories cat ON cat.id = gi.category_id
                WHERE gi.is_deleted = false`,
            QueryTypes.SELECT);

        console.log('End execution of listOfGroceries function')
        return groceryItems
    } catch (error) {
        console.log('Error occured in listOfGroceries', error)
        throw error;
    }
}