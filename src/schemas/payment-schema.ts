
import { InputTicketBody } from "@/protocols";
import Joi from "joi";


const paymentSchema = Joi.object<InputTicketBody>({
    ticketId: Joi.number().required(),
    cardData: Joi.object().required()
})

export default paymentSchema