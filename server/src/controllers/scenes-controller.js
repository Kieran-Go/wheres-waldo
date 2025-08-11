const prisma = require('../../db/pool');

module.exports = {
    getAllScenes: async () => {
        try {
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

        } catch (err) {
            throw err;
        }
    },

    getScene: async (id) => {
        try {
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
        } catch (err) {
            throw err;
        }
    },


    createScene: async (name, imageUrl) => {
        try{
            return await prisma.scene.create({
                data: { name: name, imageUrl: imageUrl }
            }); 
        }
        catch(err) {
            throw err;
        }
    },

    editScene: async (id, name, imageUrl) => {
        try{
            return await prisma.scene.update({
                where: { id: id },
                data: { name: name, imageUrl: imageUrl }
            });
        }
        catch(err) {
            throw err;
        }
    },

    deleteScene: async (id) => {
        try{
            return await prisma.scene.delete({
                where: { id: id }
            });
        }
        catch(err) {
            throw err;
        }
    },
}