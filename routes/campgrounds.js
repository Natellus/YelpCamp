const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');

const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })



// router.get('/', catchAsync(campgrounds.index))

// router.get('/new',isLoggedIn, campgrounds.renderNewForm)

// // router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

// router.post('/', upload.array('image'),(req,res)=>{
//     console.log(req.body,req.files);
//     res.send('It worked?');
// })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(upload.array('image'), (req, res) => {
    console.log(req.body,req.files);
    res.send('It worked?')
    })


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))



// router.get('/:id', catchAsync(campgrounds.showCampground));



// router.put('/:id',isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// router.delete('/:id',isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;