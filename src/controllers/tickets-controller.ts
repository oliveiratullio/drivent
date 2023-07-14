import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";


export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    try {
       const ticketTypes = await ticketService.getTicketTypes()
       return res.send(ticketTypes)
    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT)  
    }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    try {
        const ticket = await ticketService.getTicketById(userId)
        return ticket
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    const {ticketTypeId} = req.body
    try {
        const ticket = await ticketService.createTicket(userId, ticketTypeId)
        res.status(201).send(ticket)
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}