import { notFoundError, unauthorizedError } from "@/errors"
import { CardPaymentParams, PaymentParams } from "@/protocols"
import enrollmentRepository from "@/repositories/enrollment-repository"
import paymentsRepository from "@/repositories/payments-repository"
import ticketRepository from "@/repositories/tickets-repository"



async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
    const ticket = await ticketRepository.findTicketById(ticketId)
    if(!ticket) throw notFoundError()
    const enrollment = await enrollmentRepository.findById(ticket.enrollmentId)
    if(!enrollment) throw notFoundError
    if(enrollment.userId !== userId) throw unauthorizedError()
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
    await verifyTicketAndEnrollment(userId, ticketId)
    const payment = await paymentsRepository.findPaymentByTicketId(ticketId)
    if(!payment) throw notFoundError()
    return payment
}

async function paymentProcess(ticketId : number, userId: number, cardData: CardPaymentParams) {
    await verifyTicketAndEnrollment(userId, ticketId)
    const ticket = await ticketRepository.findTicketWithTypeById(ticketId)
    const paymentData: PaymentParams = {
        value: ticket.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4)
     }
     const payment = await paymentsRepository.createPayment(ticketId, paymentData)

     await ticketRepository.ticketProcessPayment(ticketId)
     return payment
}

const paymentsService = {
    getPaymentByTicketId,
    paymentProcess
}

export default paymentsService