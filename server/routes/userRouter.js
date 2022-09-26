const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/refresh_token',userCtrl.refreshToken)
router.get('/infor',auth,userCtrl.getUser)
router.patch('/addcart',auth,userCtrl.addCart)
router.patch('/update/name',auth,userCtrl.updateName)
router.patch('/update/email',auth,userCtrl.updateEmail)
router.get('/history',auth,userCtrl.history)
module.exports = router