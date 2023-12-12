import { Router } from "express";

import * as controller from "../controller/EventController.js";

const router = Router();

router.get("/:id", controller.getEventById);

router.post("/", controller.createEvent);

router.get("/", controller.getAllEvents);

export default router;
