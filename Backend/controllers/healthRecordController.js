const HealthRecord = require('../models/healthRecords');
const ErrorResponse = require("../utils/errorResponse");
const { logger } = require('../middlewares/logger');

//create a new health record
exports.createHealthRecord = async (req, res, next) => {
    try {
        logger.debug('Attempting to create a new health record');
        const record = new HealthRecord(req.body);
        await record.save();
        logger.info('Health record created successfully');
        res.status(201).json(record);

    } catch (error) {
        logger.error(`Error while creating health record: ${error.message}`);
        next(error)
    }
}


//Retrieve all health records

exports.getAllHealthRecords = async (req, res, next) => {
    try {
        logger.debug('Attempting to fetch  all health record');
        const records = await HealthRecord.find();
        logger.info('Health records fetched successfully');
        res.status(200).json(records);

    } catch (error) {
        logger.error(`Error while fetching health records : ${error.message}`);
        next(error)
    }

};


exports.getHealthRecordById = async (req, res, next) => {
    try {
        logger.debug('Attempting to find a health record by id');
        const record = await HealthRecord.findById(req.params.id);
        if (!record) return next(new ErrorResponse('Health record not found', 404));
        logger.info('Health record fetched successfully');
        res.status(200).json(record);

    } catch (error) {
        logger.error(`Error while fetching health record: ${error.message}`);
        next(error)
    }
}

exports.updateHealthRecord = async (req, res,next) => {
    try {
        logger.debug('Attempting to update a health record by id');
        const record = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) return next(new ErrorResponse('Health record not found', 404));
        logger.info('Health record updated successfully');
        res.status(200).json(record);
    } catch (error) {
        logger.error(`Error while updating health record: ${error.message}`);
        next(error)
    }
}


// Delete a health record
exports.deleteHealthRecord = async (req, res,next) => {
    try {
        logger.debug('Attempting to delete a health record by id');
        const record = await HealthRecord.findByIdAndDelete(req.params.id);
        if (!record) return next(new ErrorResponse('Health record not found', 404));
        logger.info('Health record deleted successfully');
        res.status(200).json({ message: 'Record deleted' });
    } catch (error) {
        logger.error(`Error while deleting health record: ${error.message}`);
        next(error);
    }
};