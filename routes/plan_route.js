const express = require('express')
const router = express.Router();
const Plan = require('../controllers/plan_controller.js')



router.post('/plan/create', Plan.createPlan)
router.get('/plan', Plan.getAllPlan)
router.get('/plan/one', Plan.getOnePlan)
router.put('/plan/update', Plan.updateOnePlan)
router.delete('/plan/delete', Plan.deletePlan)



module.exports = router;