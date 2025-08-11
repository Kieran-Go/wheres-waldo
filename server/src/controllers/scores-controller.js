const prisma = require('../../db/pool');

module.exports = {
    getAllScores: async () => {
        return await prisma.score.findMany();
    },

    getScoreById: async (id) => {
        const score = await prisma.score.findUnique({
            where: { id }
        });

        if (!score) {
            const error = new Error(`Score with id ${id} not found`);
            error.statusCode = 404;
            throw error;
        }

        return score;
    },

    getScoresBySceneId: async (sceneId) => {
        return await prisma.score.findMany({
            where: { sceneId }
        });
    },

    createScore: async (name, time, sceneId) => {
        return await prisma.score.create({
            data: { name, time, sceneId}
        });
    },

    editScore: async (id, name, time) => {
        return await prisma.score.update({
            where: { id },
            data: { name, time }
        });
    },

    deleteScore: async (id) => {
        return await prisma.score.delete({
            where: { id }
        });
    },

    deleteSceneScores: async (sceneId) => {
        return await prisma.score.deleteMany({
            where: { sceneId }
        });
    }
}