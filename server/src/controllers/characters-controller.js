const prisma = require('../../db/pool');

module.exports = {
    getAllCharacters: async () => {
        try{
            return await prisma.character.findMany();
        }
        catch(err) {
            throw err;
        }
    },

    getCharacter: async (id) =>{
        try{
            return await prisma.character.findUnique({
                where: { id: id }
            });
        }
        catch(err){
            throw err;
        }
    },

    createCharacter: async (name, imageUrl) => {
        try{
            return await prisma.character.create({
                data: { name: name, imageUrl: imageUrl }
            }); 
        }
        catch(err) {
            throw err;
        }
    },

    editCharacter: async (id, name, imageUrl) => {
        try{
            return await prisma.character.update({
                where: { id: id },
                data: { name: name, imageUrl: imageUrl }
            });
        }
        catch(err) {
            throw err;
        }
    },

    deleteCharacter: async (id) => {
        try{
            return await prisma.character.delete({
                where: { id: id }
            });
        }
        catch(err) {
            throw err;
        }
    },
}