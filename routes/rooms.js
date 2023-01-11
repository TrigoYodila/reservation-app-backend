import express from "express";
import { updateRoomAvailibility } from "../controllers/room.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js ";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailibility);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms)

export default router;
