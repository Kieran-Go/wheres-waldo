const prisma = require('../../db/pool');

module.exports = {
    getSceneCharacters: async () => {
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
    },

    getSceneCharactersBySceneId: async (sceneId) => {
        return await prisma.sceneCharacter.findMany({
            where: { sceneId },
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
    },

    createSceneCharacter: async (sceneId, characterId, xMin, xMax, yMin, yMax) => {
        return await prisma.sceneCharacter.create({
            data : {sceneId, characterId, xMin, xMax, yMin, yMax}
        });
    },

    editSceneCharacter: async (sceneId, characterId, xMin, xMax, yMin, yMax) => {
        return await prisma.sceneCharacter.update({
            where: { sceneId_characterId: { sceneId, characterId } },
            data : { xMin, xMax, yMin, yMax }
        });
    },

    deleteSceneCharacter: async (sceneId, characterId) => {
        return await prisma.sceneCharacter.delete({
            where: { sceneId_characterId: {sceneId, characterId } },
        });
    },
}