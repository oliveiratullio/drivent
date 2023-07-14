import { notFoundError } from "@/errors";
import { CreateTicketParams } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";



async function getTicketTypes() {
    const ticketTypes = await ticketRepository.findTicketTypes()
    return ticketTypes
}

async function getTicketById(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment){
        throw notFoundError()
    }
    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) {
        throw notFoundError()
    }
}   

async function createTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment){
        throw notFoundError()
    }
    const ticketData: CreateTicketParams = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
    }
    await ticketRepository.createTicket(ticketData)
    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id)
    return ticket
}

const ticketService = {
    getTicketTypes,
    getTicketById,
    createTicket
}

export default ticketService