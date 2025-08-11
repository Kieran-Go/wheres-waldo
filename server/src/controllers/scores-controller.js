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

    getScore: async (id) => {
        try {
            return await prisma.score.findUnique({
                where: { id: id }
            })
        }
        catch(err) {
            throw err;
        }
    },

    getSceneScores: async (sceneId) => {
        try{
            return await prisma.score.findMany({
                where: { sceneId: sceneId }
            })
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

    editScore: async (id, name, time) => {
        try {
            return await prisma.score.update({
                where: { id: id },
                data: { name: name, time: time }
            })
        }
        catch(err) {
            throw err;
        }
    },

    deleteScore: async (id) => {
        try {
            return await prisma.score.delete({
                where: { id: id }
            })
        }
        catch(err) {
            throw err;
        }
    },

    deleteSceneScores: async (sceneId) => {
        try{
            return await prisma.score.deleteMany({
                where: { sceneId: sceneId }
            })
        }
        catch(err) {
            throw err;
        }
    }
}