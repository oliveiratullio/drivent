import { notFoundError } from "@/errors"
import { forbiddenError } from "@/errors/forbidden-error"
import bookingRepository from "@/repositories/booking-repository"
import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketRepository from "@/repositories/tickets-repository"


async function getBooking(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()
    const booking = await bookingRepository.findBookingByUserId(userId)
    if(!booking) throw notFoundError()
    return booking
}

async function postBooking(userId: number, roomId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()
    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw forbiddenError()
    const room = await bookingRepository.findRoomById(roomId)
    const booking = await bookingRepository.findBookingByRoomId(roomId)
    if(room.capacity <= booking.length) throw forbiddenError()
    return bookingRepository.createBooking(roomId, userId)
}

async function changeBookingRoomById(userId: number, roomId: number) {
    const room = await bookingRepository.findRoomById(roomId)
    const bookings = await bookingRepository.findBookingByRoomId(roomId)
    if (!room) throw notFoundError()
    if (room.capacity <= bookings.length) throw forbiddenError()
    const booking = await bookingRepository.findBookingByUserId(userId)
    if (!booking || booking.userId !== userId) throw forbiddenError()
    const id = booking.id
    return bookingRepository.updateBooking(id, roomId, userId,)
  }


const bookingService ={
 getBooking,
 postBooking,
 changeBookingRoomById
}

export default bookingService