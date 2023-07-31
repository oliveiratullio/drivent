import faker from "@faker-js/faker";
import { prisma } from "@/config";

function createRoom(){
    return {
        id: faker.datatype.number(),
        name: faker.name.firstName(),
        capacity: faker.datatype.number({ min: 2, max: 6 }),
        hotelId: faker.datatype.number(),
    };
}

function createBooking(userId: number, roomId: number) {
    return prisma.booking.create({
      data: {
        userId,
        roomId
      },
    });
  }


const bookingMock ={
    createRoom,
    createBooking
}

export default bookingMock