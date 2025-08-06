// A mock database for development use only - until a proper backend database
// has been developed
const db = [
    {
        id: 1,
        name: 'A Dream Come True',
        imageUrl: 'https://res.cloudinary.com/de7vulkpy/image/upload/v1754270435/a_dream_come_true_m2uyiq.jpg',
        characters: [
            {
                id: 1,
                name: 'Waldo',
                imageUrl: 'https://res.cloudinary.com/de7vulkpy/image/upload/v1754442730/waldo_tblzjb.png',
                xMin: 2274,
                xMax: 2313,
                yMin: 592,
                yMax: 654,
            },
            {
                id: 2,
                name: 'Wenda',
                imageUrl: 'https://res.cloudinary.com/de7vulkpy/image/upload/v1754442720/wenda_qtseu3.png',
                xMin: 2274,
                xMax: 2313,
                yMin: 592,
                yMax: 654,
            },
            {
                id: 3,
                name: 'Wizard',
                imageUrl: 'https://res.cloudinary.com/de7vulkpy/image/upload/v1754442712/whitebeard_z3xzcl.png',
                xMin: 2274,
                xMax: 2313,
                yMin: 592,
                yMax: 654,
            },
            {
                id: 4,
                name: 'Odlaw',
                imageUrl: 'https://res.cloudinary.com/de7vulkpy/image/upload/v1754442654/odlaw_y5xmke.png',
                xMin: 2274,
                xMax: 2313,
                yMin: 592,
                yMax: 654,
            },
            {
                id: 5,
                name: 'Woof',
                imageUrl: 'https://res.cloudinary.com/de7vulkpy/image/upload/v1754442642/woof_rki34e.png',
                xMin: 2274,
                xMax: 2313,
                yMin: 592,
                yMax: 654,
            },
        ],
        scores: [
            {
                id: 1,
                name: "Kieran",
                time: 120,
            },
            {
                id: 2,
                name: "Ava",
                time: 105,
            },
            {
                id: 3,
                name: "Liam",
                time: 98,
            },
            {
                id: 4,
                name: "Sofia",
                time: 134,
            },
            {
                id: 5,
                name: "Noah",
                time: 115,
            },
        ],
    },
];

export default db;