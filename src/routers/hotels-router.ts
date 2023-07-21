import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotelWithRooms, getHotels } from "@/controllers/hotels-controller";


const hotelsRouter = Router()

hotelsRouter
 .all("/*", authenticateToken)
 .get("/", getHotels)
 .get("/:hotelId", getHotelWithRooms)

export default hotelsRouter