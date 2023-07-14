import { InputTicketBody } from "@/protocols";
import Joi from "joi";

export const ticketsSchema = Joi.object<InputTicketBody>({
    ticketTypeId: Joi.number().required()
})