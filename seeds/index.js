const mongoose = require('mongoose');
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const sample          = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61fccf8e0b7cd5020bfb2438',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/de5cu9asx/image/upload/v1644080693/YelpCamp/ewtqa8fstu0lmbvqpnt8.jpg',
                    filename: 'YelpCamp/ewtqa8fstu0lmbvqpnt8'
                },
                {
                    url: 'https://res.cloudinary.com/de5cu9asx/image/upload/v1644080693/YelpCamp/ajuyagq8whwixtvmhrwb.jpg',
                    filename: 'YelpCamp/ajuyagq8whwixtvmhrwb'
                }

            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sit nobis velit vero similique culpa dolorem dolores, voluptatem, unde provident expedita. Et atque fugit quasi similique odit earum enim itaque.',
            price

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});




