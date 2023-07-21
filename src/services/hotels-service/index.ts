import { notFoundError } from "@/errors"
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error"
import enrollmentRepository from "@/repositories/enrollment-repository"
import hotelsRepository from "@/repositories/hotels-repository"
import ticketRepository from "@/repositories/tickets-repository"
import { threadId } from "worker_threads"


async function getHotels(userId: number) {
    await listHotels(userId)

    const hotels = await hotelsRepository.findHotels()
    return hotels
}

async function listHotels(userId: number ) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()
    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFoundError()
    if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || ticket.TicketType.includesHotel) throw cannotListHotelsError()
}

async function getHotelWithRooms(userId: number, hotelId: number) {
    await listHotels(userId)
    const hotel = await hotelsRepository.findRoomsByHotelId(hotelId)
    if(!hotel) throw notFoundError()
    return hotel

}

const hotelsService = {
    getHotels,
    getHotelWithRooms
}

export default hotelsService