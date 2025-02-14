import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { commonQueries } from "../utils/commonQueries";


export const createOrder = async (req: any, res: Response) => {
    try {
        console.log('Started execution of createOrder function', req.body, req.user)

        const { items } = req.body;
        const { id: userId } = req.user;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'PLEASE_ADD_ITEMS_TO_CART' });
        }

        const itemIds = items.map(item => item?.item_id);
        const getRequestedItems = await commonQueries({ itemIds }, `SELECT * FROM grocery_items WHERE id IN (:itemIds)`, QueryTypes.SELECT);

        if (!getRequestedItems.length) throw new Error('ITEMS_NOT_FOUND');

        const totalPrice = items.reduce((sum: any, item: any) => {
            const itemDetails = getRequestedItems.find((el: any) => el.id === item.item_id);
            return sum + (parseFloat(itemDetails?.price || 0) * item.quantity);
        }, 0);

        const createOrderQuery = `INSERT INTO orders (user_id, total_price, order_status) VALUES (:userId, :totalPrice, 'PENDING')`;
        const replacements = {
            userId, totalPrice,
        }
        await commonQueries(replacements, createOrderQuery, QueryTypes.INSERT);
        const [{ lastInsertedOrderId }] = await commonQueries({}, 'SELECT LAST_INSERT_ID() as lastInsertedOrderId', QueryTypes.SELECT);

        const replacementsOrderItems = items.map((item: any) => {
            const itemDetails = getRequestedItems.find((el: any) => el.id === item.item_id);
            return [
                lastInsertedOrderId,
                item.item_id,
                item.quantity,
                itemDetails ? itemDetails.price : 0
            ];
        });

        const createOrderItemsQuery = `
                        INSERT INTO order_items (order_id, item_id, quantity, price) 
                        VALUES ${replacementsOrderItems.map((_: any, index: any) => `(:lastInsertedOrderId, :itemId${index}, :quantity${index}, :price${index})`).join(',')}
                        `;

        const replacementsItems = items.reduce((acc: { [x: string]: any; }, element: { item_id: any; quantity: any; price: any; }, index: any) => {
            const itemDetails = getRequestedItems.find((el: any) => el.id === element.item_id);
            acc[`itemId${index}`] = element.item_id;
            acc[`quantity${index}`] = element.quantity;
            acc[`price${index}`] = itemDetails ? itemDetails.price : 0;
            return acc;
        }, { lastInsertedOrderId });

        const createOrderItemsData = await commonQueries(replacementsItems, createOrderItemsQuery, QueryTypes.INSERT);

        if (!createOrderItemsData?.length) return { message: 'RECORD_NOT_ADDED' };

        console.log('End execution of createOrder function')

        return { message: 'ORDER_SUCCESSFULLY_CREATED' }

    } catch (error) {
        console.log('Error occured in createOrder', error)
        throw error;
    }
}