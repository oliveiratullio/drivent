import { prisma } from "@/config";

function findHotels(){
    return prisma.hotel.findMany()
}


const hotelsRepository = {
    findHotels
}