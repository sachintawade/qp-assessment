export const checkRoleAuth = (req: any, accessRoles: any) => {
    try {
        if (!accessRoles.includes(req.user.role)) throw new Error('ACCESS_DENIED');
        return true;
    } catch (error) {
        throw error;
    }
}