const express= require('express');
const router= express.Router();



const{getFeeds,newFeed, getAdminFeeds,getSingleFeed, updateFeed, deleteFeed}=require('../controllers/feedController')
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/feeds').get(getFeeds);
router.route('/admin/feeds').get(getAdminFeeds);

router.route('/feed/:id').get(getSingleFeed);
router.route('/admin/feed/new').post(isAuthenticatedUser,authorizeRoles('admin'),newFeed);
router.route('/admin/feed/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateFeed).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteFeed); 



module.exports=router;