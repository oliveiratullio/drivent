import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { editBooking, getBooking, postBooking } from "@/controllers/booking-controller";


const bookingRouter = Router()

bookingRouter
 .all("/*", authenticateToken)
 .get("/", getBooking)
 .post("/", postBooking)
 .put("/:bookingId", editBooking)

 export default bookingRouter