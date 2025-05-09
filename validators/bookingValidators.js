// validators/bookingValidators.js
const Joi = require('joi');

const bookActivitySchema = Joi.object({
    activityId: Joi.string().hex().length(24).required().messages({'string.hex': 'Invalid Activity ID format', 'string.length': 'Invalid Activity ID format'}),
});

module.exports = {
    bookActivitySchema,
};