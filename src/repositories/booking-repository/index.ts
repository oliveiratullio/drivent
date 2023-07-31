import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
    return prisma.booking.findFirst({
        where:{
            userId
        },
        include:{
            Room: true
        }
    })
}

async function findRoomById(roomId: number){
    return prisma.room.findUnique({
        where:{
            id: roomId
        }
    })
}
async function findBookingByRoomId(roomId: number) {
    return prisma.room.findMany({
        where: {
            roomId
        }
    })
}

async function createBooking(roomId: number, userId: number) {
    return prisma.booking.create({
        data: {
            roomId,
            userId
        }
    })
}

async function updateBooking(id: number, roomId: number, userId: number){
    return prisma.booking.upsert({
        where:{
            id
        },
        create: {
            roomId,
            userId
        }, update: {
            roomId
        }
    })
}

const bookingRepository={
    findBookingByUserId, 
    findRoomById,
    findBookingByRoomId,
    createBooking,
    updateBooking
}

export default bookingRepository