import express from "express";
import {
  createMemory,
  deleteMemory,
  getAllMemories,
  likeMemory,
  updateMemory,
} from "../controllers/controllers.js";

const router = express.Router();

router.route("/").get(getAllMemories).post(createMemory);
router.route("/:id").patch(updateMemory).delete(deleteMemory);
router.route("/:id/like").patch(likeMemory);

export default router;
