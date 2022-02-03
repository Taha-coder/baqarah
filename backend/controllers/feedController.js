
const Feed=require('../models/feed')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors=require('../middlewares/catchAsyncErrors');
const APIFeatures=require('../utils/apiFeatures')
 
exports.newFeed = catchAsyncErrors(async (req, res, next) => {

 
    const feed = await Feed.create(req.body);

    res.status(201).json({
        success: true,
        feed
    })
})


// Get all feeds   =>   /api/v1/feeds?keyword=apple
exports.getFeeds = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const feedsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Feed.find(), req.query)
        .search()
        .filter()

    let feeds = await apiFeatures.query;
    let filteredFeedsCount = feeds.length;

    apiFeatures.pagination(resPerPage)
    feeds = await apiFeatures.query;


    res.status(200).json({
        success: true,
        feedsCount,
        resPerPage,
        filteredFeedsCount,
        feeds
    })

})

// Get all feeds (Admin)  =>   /api/v1/admin/feeds
exports.getAdminFeeds = catchAsyncErrors(async (req, res, next) => {

    const feeds = await Feed.find();

    res.status(200).json({
        success: true,
        feeds
    })

})
//Get single feed details => /api/v1/feed/:id

exports.getSingleFeed=catchAsyncErrors (async(req,res,next)=>{
    const feed=await Feed.findById(req.params.id);

    if (!feed){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        feed
    })
})

// Update Feed  =>   /api/v1/admin/feed/:id
exports.updateFeed = catchAsyncErrors(async (req, res, next) => {

    let feed = await Feed.findById(req.params.id);

    if (!feed) {
        return next(new ErrorHandler('Product not found', 404));
    }


    feed = await Feed.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        feed
    })

})


//Delete Feed => /api/v1/admin/feed/:id


exports.deleteFeed=catchAsyncErrors (async(req,res,next)=>{
    const feed=await Feed.findById(req.params.id);

    if (!feed){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
   
    await feed.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})



