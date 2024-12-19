import express from "express";
import {
  createMemory,
  deleteMemory,
  getAllMemories,
  updateMemory,
} from "../controllers/controllers.js";

const router = express.Router();

router.route("/").get(getAllMemories).post(createMemory);
router.route("/:id").patch(updateMemory).delete(deleteMemory);

export default router;
