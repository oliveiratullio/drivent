import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    try {
        const hotels = await hotelsService.getHotels(userId)
        return res.send(hotels)
    } catch (error) {
        if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED)
    }
}

export async function getHotelWithRooms(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    const hotelId = Number(req.params.hotelId)
    try {
        const hotel = await hotelsService.getHotelWithRooms(userId, hotelId)
        return res.send(hotel)
    } catch (error) {
        if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND)
        
        if(error.name === "CannotListHotelsError") return res.sendStatus(httpStatus.PAYMENT_REQUIRED)

        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

