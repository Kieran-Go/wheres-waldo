const prisma = require('../../db/pool');

module.exports = {
    getAllScores: async () => {
        try{
            return await prisma.score.findMany();
        }
        catch(err) {
            throw err;
        }
    },

    createScore: async (name, time, sceneId) => {
        try{
            return await prisma.score.create({
                data: { name: name, time: time, sceneId: sceneId }
            })
        }
        catch(err) {
            throw err;
        }
    },
}