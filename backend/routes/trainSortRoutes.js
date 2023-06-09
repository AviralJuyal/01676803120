const express = require("express");
const { getTrainData , getSelectedData } = require("../controllers/trainSortController");
const router = express.Router();

router.route('/')
        .get(getTrainData)

router.route('/:id')
        .get(getSelectedData)

        



module.exports = router;