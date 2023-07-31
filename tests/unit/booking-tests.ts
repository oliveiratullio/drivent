import faker from "@faker-js/faker";
import bookingMock from "../factories/booking-factory";
import bookingRepository from "@/repositories/booking-repository";
import bookingService from "@/services/booking-service";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { forbiddenError } from "@/errors/forbidden-error";


beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('Get booking', () => {
    it('should return reservation when user have a reservation', async () => {
      const bookingId = faker.datatype.number()
      const userId = faker.datatype.number()
      const room = ();bookingMock.createRoom()
      jest.spyOn(bookingRepository, 'findBookingByUserId').mockImplementationOnce((): any => {
        return {
          id: bookingId,
          room,
        };
      })
      const result = await bookingService.getBooking(userId);
      expect(bookingRepository.findBookingByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual({
        id: bookingId,
        room,
      })
    })

    it('should throw a not found error when a reservation is not found', async () => {
        const userId = faker.datatype.number();
        jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValueOnce(null)
        const result = bookingService.getBooking(userId)
        await expect(result).rejects.toEqual(notFoundError())
        expect(bookingRepository.findBookingByRoomId).toBeCalledTimes(1)
      })});
    
      describe('Post booking', () => {
        it('should throw a not found error when there is no ticket', async () => {
          const userId = faker.datatype.number()
          const roomId = faker.datatype.number()
          jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(null)
          const result = bookingService.postBooking(userId, roomId)
          await expect(result).rejects.toEqual(notFoundError())
          expect(enrollmentRepository.findWithAddressByUserId).toBeCalledTimes(1)
        })
        
    })
    
    describe('Put booking', () => {
        it('should throw a forbidden error when booking is not found', async () => {
          const userId = faker.datatype.number()
          const roomId = faker.datatype.number()
          const booking = bookingMock.createBooking(userId, roomId)
          jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValueOnce(null)
          const result = bookingService.changeBookingRoomById(userId, roomId)
          await expect(result).rejects.toEqual(forbiddenError())
          expect(bookingRepository.findBookingByUserId).toBeCalledTimes(1)
        })
    })
    