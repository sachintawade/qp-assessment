import { Request, Response } from "express";
import { commonQueries } from "../../utils/commonQueries";
import { QueryTypes } from "sequelize";


export const addGroceries = async (req: Request, res: Response) => {
    try {
        console.log('Started execution of addGroceries function', req.body)

        const { category, groceryName, price = 0, quantity = 0 } = req.body;

        const selectCategory = await commonQueries({ category }, `SELECT id as categoryId FROM categories WHERE name = :category`, QueryTypes.SELECT);

        let catId;
        if (selectCategory.length) {
            const [{ categoryId }] = selectCategory;
            catId = categoryId
        } else {
            await commonQueries({ category }, `INSERT INTO categories (name) VALUES(:category)`, QueryTypes.INSERT);

            const [{ lastInsertedId }] = await commonQueries({}, 'SELECT LAST_INSERT_ID() as lastInsertedId', QueryTypes.SELECT);
            console.log('lastInsertedId', lastInsertedId);
            catId = lastInsertedId;
        }

        const checkIfSameGroceryIsExist = await commonQueries({ catId, groceryName }, `SELECT * FROM grocery_items WHERE category_id = :catId AND name = :groceryName`, QueryTypes.SELECT);

        if (checkIfSameGroceryIsExist.length) throw new Error('GROCERY_ALREDY_EXIST_PLEASE_UPDATE_SAME_GROCERY');

        const addGroceriesQuery = `INSERT INTO grocery_items (category_id, name, price, quantity) VALUES(:catId, :groceryName, :price, :quantity)`;

        const replacements = {
            catId, groceryName, price, quantity
        }

        const addGroceriesData = await commonQueries(replacements, addGroceriesQuery, QueryTypes.INSERT);

        if (!addGroceriesData?.length) return { message: 'RECORD_NOT_ADDED' };

        console.log('End execution of addGroceries function')

        return { message: 'GROCERY_ADDED_SUCCESSFULLY' }

    } catch (error) {
        console.log('Error occured in addGroceries', error)
        throw error;
    }
}