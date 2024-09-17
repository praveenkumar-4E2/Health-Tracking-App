const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please provide a date'],
        default: Date.now()
    },
    bodyTemperature: {
        type: Number,
        required: [true, 'Please provide body temperature'],
        min: [35, 'Temperature too low'],
        max: [110, 'Temperature too high']
    },
    bloodPressure: {
        type: String,
        required: [true, 'Please provide blood pressure'],
        validate: {
            validator: function (v) {
                // Blood pressure format validation (e.g., "120/80")
                return /^\d{2,3}\/\d{2,3}$/.test(v);
            },
            message: props => `${props.value} is not a valid blood pressure format. It should be in the format of "120/80"`
        }
    },
    heartRate: {
        type: Number,
        required: [true, 'Please provide heart rate'],
        min: [40, 'Heart rate too low'],
        max: [180, 'Heart rate too high']
    }

}, { timestamps: true }
);


module.exports = new mongoose.model('HealthRecord', healthRecordSchema);