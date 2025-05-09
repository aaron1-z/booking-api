// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const { getAllActivities, createActivity } = require('../controllers/activityController');

router.get('/', getAllActivities);
router.post('/', createActivity); // For seeding/testing

module.exports = router;