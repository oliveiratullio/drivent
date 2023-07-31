import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";


export async function getBooking(req: AuthenticatedRequest, res: Response){
    const {userId} = req
    try {
        const booking = await bookingService.getBooking(userId)
        return res.status(httpStatus.OK).send({
            id: booking.id,
            Room: booking.Room
        })
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function postBooking(req: AuthenticatedRequest, res: Response){
    const {userId} = req
    const {roomId} = req.body
    try {
        if(!roomId) return res.sendStatus(httpStatus.BAD_REQUEST)
        const booking = await bookingService.postBooking(userId, Number(roomId))
        return res.status(httpStatus.OK).send({
            bookingId: booking.id
        })
    } catch (error) {
        if(error.name === 'ForbidenError') return res.sendStatus(httpStatus.FORBIDDEN)
        return res.sendStatus(httpStatus.NOT_FOUND) 
    }
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;
    const bookingId = Number(req.params.bookingId);
    try {
        if (!bookingId) return res.sendStatus(httpStatus.BAD_REQUEST);
        if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);
        const booking = await bookingService.changeBookingRoomById(userId, Number(roomId));
        return res.status(httpStatus.OK).send({
          bookingId: booking.id,
        });
      } catch (error) {
        if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
}