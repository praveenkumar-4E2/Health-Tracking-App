const express = require('express');
const healthRecordController = require("../controllers/healthRecordController")
const router = express.Router();


//CRUD routes for Health Record

router.post('/', healthRecordController.createHealthRecord);
router.get('/', healthRecordController.getAllHealthRecords);
router.get('/:id', healthRecordController.getHealthRecordById);
router.put('/:id', healthRecordController.updateHealthRecord);
router.delete('/:id', healthRecordController.deleteHealthRecord);

module.exports = router;
