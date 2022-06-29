const router = require('express').Router();
const authController = require('./controller/auth-controller');
const activateController = require('./controller/activateController');
const authMiddleware = require('./middleware/auth-middleware');
const roomsController = require('./controller/roomsController');

router.post('/api/send-otp',authController.sendOtp);
router.post('/api/verify-otp',authController.verifyOtp);
router.post('/api/activate',authMiddleware,activateController.activate);
router.get('/api/refresh',authController.refresh);
router.post('/api/logout',authMiddleware,authController.logout);
router.post('/api/rooms',authMiddleware,roomsController.create);
router.get('/api/rooms',authMiddleware,roomsController.index);

module.exports = router; 