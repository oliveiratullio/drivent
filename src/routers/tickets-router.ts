import { authenticateToken, validateBody } from "@/middlewares";
import { Router } from "express";
import { ticketsSchema } from "@/schemas/ticket-schema";
import { createTicket, getTicketTypes, getTickets } from "@/controllers/tickets-controller";

const ticketsRouter = Router()

ticketsRouter
.all("/*", authenticateToken)
.get("/types", getTicketTypes)
.get("/", getTickets)
.post("/", validateBody(ticketsSchema), createTicket)


export default ticketsRouter