import { prisma } from "@/config";
import { CreateTicketParams } from "@/protocols";
import { TicketStatus } from "@prisma/client";


async function findTicketTypes() {
    return await prisma.ticketType.findMany()
}

async function findTicketByEnrollmentId(enrollmentId: number) {
    return await prisma.ticket.findFirst({
        where:{
            enrollmentId
        },
        include:{
            TicketType: true
        }
    })
}

async function createTicket(ticket: CreateTicketParams) {
    return await prisma.ticket.create({
        data: ticket
    })    
}

async function findTicketById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId
        },
        include: {
            Enrollment:true
        }
    })
}

async function ticketProcessPayment(ticketId: number) {
    return prisma.ticket.update({
        where:{
            id: ticketId
        },
        data: {
            status: TicketStatus.PAID
        }
    })    
}

async function  findTicketWithTypeById(ticketId: number) {
    return prisma.ticket.findFirst({
        where:{
            id: ticketId
        },
        include:{
            TicketType: true
        }
    })
    
}

const ticketRepository = {
    findTicketTypes,
    findTicketByEnrollmentId,
    createTicket,
    findTicketById,
    ticketProcessPayment,
    findTicketWithTypeById
}

export default ticketRepository