const prisma = require('../../db/pool');

module.exports = {
    getSceneCharacters: async () => {
        try{
            return await prisma.sceneCharacter.findMany({
                include: {
                    character: {
                        select: {
                            name: true, imageUrl: true
                        }
                    },
                    scene: {
                        select: {
                            name: true, imageUrl: true
                        }
                    }
                }
            });
        }
        catch(err){
            throw err;
        }
    },

    getSceneCharactersByScene: async (sceneId) => {
        try{
            return await prisma.sceneCharacter.findMany({
                where: { sceneId: sceneId },
                include: {
                    character: {
                        select: {
                            name: true, imageUrl: true
                        }
                    },
                    scene: {
                        select: {
                            name: true, imageUrl: true
                        }
                    }
                }
            });
        }
        catch(err){
            throw err;
        }
    },

    createSceneCharacter: async (sceneId, characterId, xMin, xMax, yMin, yMax) => {
        try{
            return await prisma.sceneCharacter.create({
                data : {sceneId: sceneId, characterId: characterId, xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax}
            });
        }
        catch(err) {
            throw err;
        }
    },

    editSceneCharacter: async (sceneId, characterId, xMin, xMax, yMin, yMax) => {
        try{
            return await prisma.sceneCharacter.update({
                where: { sceneId_characterId: {sceneId: sceneId, characterId: characterId } },
                data : { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax }
            });
        }
        catch(err) {
            throw err;
        }
    },

    deleteSceneCharacter: async (sceneId, characterId) => {
        try{
            return await prisma.sceneCharacter.delete({
                where: { sceneId_characterId: {sceneId: sceneId, characterId: characterId } },
            });
        }
        catch(err) {
            throw err;
        }
    },
}