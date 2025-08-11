const prisma = require('../../db/pool');

module.exports = {
    getAllCharacters: async () => {
        return await prisma.character.findMany();
    },

    getCharacterById: async (id) =>{
        const character = await prisma.character.findUnique({
            where: { id }
        });

        if (!character) {
            const error = new Error(`Character with id ${id} not found`);
            error.statusCode = 404;
            throw error;
        }

        return character;
    },

    createCharacter: async (name, imageUrl) => {
        return await prisma.character.create({
            data: { name, imageUrl }
        }); 
    },

    editCharacter: async (id, name, imageUrl) => {
        return await prisma.character.update({
            where: { id },
            data: { name, imageUrl}
        });
    },

    deleteCharacter: async (id) => {
        return await prisma.character.delete({
            where: { id }
        });
    },
}