const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log('MongodbコネクションOK');
    })
    .catch(err => {
        console.log('Mongodbコネクションエラー');
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 2000) + 1000;
        const camp = new Campground({
            author: '6714548e57ff06493e33fd16',
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            description: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ...',
            geometry: {
                type: 'Point',
                coordinates: [cities[randomCityIndex].longitude, cities[randomCityIndex].latitude]
            },
            price,
            images:[
                {
                    url: 'https://res.cloudinary.com/drjeywjxh/image/upload/v1729900981/YelpCamp/jztly61n9scqs7m9ezd4.jpg',
                    filename: 'YelpCamp/jztly61n9scqs7m9ezd4'
                },
                {
                    url: 'https://res.cloudinary.com/drjeywjxh/image/upload/v1729900981/YelpCamp/m3woyd7edisr55vsjenj.jpg',
                    filename: 'YelpCamp/m3woyd7edisr55vsjenj'
                }
              ],
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});