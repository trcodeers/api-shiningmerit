import express from "express";

import daysRoute from "./days.js"
import topicRoute from "./topics.js"
import noteRoute from "./notes.js"
import tableRoute from "./table.js"
import authRoute from "./auth.js"
import indianStatesRoute from "./indianStates.js"
import userRoute from "./user.js";
import factsRoute from "./facts.js";
import mcqRoute from "./mcq.js";

const router = express.Router();

router.use('/days', daysRoute)
router.use('/topics', topicRoute)
router.use('/notes', noteRoute)
router.use('/tables', tableRoute)
router.use('/indianStates', indianStatesRoute)
router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/facts', factsRoute)
router.use('/mcq', mcqRoute)



export default router;