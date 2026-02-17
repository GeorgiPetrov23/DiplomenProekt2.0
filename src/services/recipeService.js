const recipes = [
    {
        _id: '1',
        title: 'Spaghetti Bolognese',
        ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic'],
        instructions: 'Cook spaghetti according to package instructions. In a separate pan, sauté onion and garlic, then add ground beef until browned. Add tomato sauce and simmer for 20 minutes. Serve sauce over spaghetti.',
        createdBy: 'user1',
        imageUrl: 'https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg'
    },
    {
        _id: '2',
        title: 'Chocolate Chip Cookies',
        ingredients: ['flour', 'butter', 'sugar', 'brown sugar', 'eggs', 'vanilla extract', 'chocolate chips', 'salt', 'baking soda'],
        instructions: 'Preheat oven to 375°F. Cream butter and sugars together. Beat in eggs and vanilla. Mix in flour, salt, and baking soda. Fold in chocolate chips. Drop spoonfuls onto baking sheet and bake for 9-11 minutes until golden brown.',
        createdBy: 'user2',
        imageUrl: 'https://images.aws.nestle.recipes/resized/5b069c3ed2feea79377014f6766fcd49_Original_NTH_Chocolate_Chip_Cookie_448_448.jpg'
    },
    {
        _id: '3',
        title: 'Caesar Salad',
        ingredients: ['romaine lettuce', 'parmesan cheese', 'croutons', 'caesar dressing', 'lemon juice', 'black pepper'],
        instructions: 'Wash and chop romaine lettuce into bite-sized pieces. Toss with caesar dressing and lemon juice. Add croutons and freshly grated parmesan cheese. Season with black pepper to taste.',
        createdBy: 'user3',
        imageUrl: 'https://static01.nyt.com/images/2024/09/10/multimedia/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb-mediumSquareAt3X.jpg'
    }
];

const getAll = () => recipes;


export default {
    getAll,
}   