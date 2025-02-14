import sequelize from '../config/db';
import { QueryTypes } from 'sequelize';

export const commonQueries = async (replacements: any = {}, query: string, type: string) => {
    let result: any = ''
    switch (type) {
        case QueryTypes.INSERT:
            result = await sequelize.query(query, { replacements, type: QueryTypes.INSERT })
            break;
        case QueryTypes.SELECT:
            result = await sequelize.query(query, { replacements, type: QueryTypes.SELECT })
            break;
        case QueryTypes.UPDATE:
            result = await sequelize.query(query, { replacements, type: QueryTypes.UPDATE })
            break;
        case QueryTypes.DELETE:
            result = await sequelize.query(query, { replacements, type: QueryTypes.DELETE })
            break;
        default:
            console.log('Default Type Pass')
            throw new Error('Invalid query type');
    }
    return result;
}