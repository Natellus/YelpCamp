const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Review = require('./review')
const Schema = mongoose.Schema;

// https://res.cloudinary.com/de5cu9asx/image/upload/w_300/v1644080693/YelpCamp/ajuyagq8whwixtvmhrwb.jpg

const ImageSchema = new Schema({
         url: String,
        filename: String
    });

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200')
})
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);


