const prisma = require('../../db/pool');

module.exports = {
    getAllScenes: async () => {
        try{
            return await prisma.scene.findMany();
        }
        catch(err){
            throw err;
        }
    }
}