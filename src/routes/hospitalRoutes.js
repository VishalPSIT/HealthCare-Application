const { Router } = require('express')
const { hospitalIsAuthenticated }  = require('../middleware/auth.js')
const { addSchdule } = require('../Controller/hospitalController.js')


const router = Router()

router.route('/add-schdule').post(hospitalIsAuthenticated, addSchdule)

module.exports = router