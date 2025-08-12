const prisma = require('../../db/pool');

module.exports = {
    getAllScenes: async () => {
        const scenes = await prisma.scene.findMany({
        include: {
            scores: {
                select: { id: true, name: true, time: true }
            },
            characters: {
            include: {
                character: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true
                }
                }
            }
            }
        }
        });

        // Transform structure to match expected output
        return scenes.map(scene => ({
            id: scene.id,
            name: scene.name,
            imageUrl: scene.imageUrl,
            characters: scene.characters.map(entry => ({
                id: entry.character.id,
                name: entry.character.name,
                imageUrl: entry.character.imageUrl,
                xMin: entry.xMin,
                xMax: entry.xMax,
                yMin: entry.yMin,
                yMax: entry.yMax
            }))
        }));
    },

    getSceneById: async (id) => {
        const scene = await prisma.scene.findUnique({
            where: { id },
            include: {
                scores: {
                    select: { id: true, name: true, time: true }
                },
                characters: {
                    include: {
                        character: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        });

        if (!scene) {
            const error = new Error(`Scene with id ${id} not found`);
            error.status = 404;
            throw error;
        }

        // Transform structure to match expected output
        return {
            id: scene.id,
            name: scene.name,
            imageUrl: scene.imageUrl,
            characters: scene.characters.map(entry => ({
                id: entry.character.id,
                name: entry.character.name,
                imageUrl: entry.character.imageUrl,
                xMin: entry.xMin,
                xMax: entry.xMax,
                yMin: entry.yMin,
                yMax: entry.yMax
            }))
        };
    },


    createScene: async (name, imageUrl) => {
        return await prisma.scene.create({
            data: { name, imageUrl }
        }); 
    },

    editScene: async (id, name, imageUrl) => {
        return await prisma.scene.update({
            where: { id },
            data: { name, imageUrl }
        });
    },

    deleteScene: async (id) => {
        return await prisma.scene.delete({
            where: { id }
        });
    },
}