import paymentController from "@/controllers/payment-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import paymentSchema from "@/schemas/payment-schema";
import { Router } from "express";


const paymentRouter = Router()

paymentRouter
    .all("/*", authenticateToken)
    .get("/", paymentController.getPaymentByTicketId)
    .post("/process", validateBody(paymentSchema), paymentController.paymentProcess)

export default paymentRouter