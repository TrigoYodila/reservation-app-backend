import express from "express";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotels.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET (find/ crée la différence entre ce root et la route countByCity)
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels)

//COUNT BY CITY
router.get("/countByCity", countByCity);
router.get("/countByType", getHotels);

export default router;