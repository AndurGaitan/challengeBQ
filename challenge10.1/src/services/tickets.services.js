import TicketsDaoMongo from '../DAO/mongo/tickets.dao.mongo.js0';
import TicketDTO from '../DTO/tickets.dto.js';

class TicketsService {
  static async createTicket(ticketData) {
    try {
      const newTicketDTO = new TicketDTO(
        ticketData.name,
        ticketData.description,
        ticketData.code,
        ticketData.purchase_datetime,
        ticketData.amount,
        ticketData.purchaser
      );

      return await TicketsDaoMongo.createTicket(newTicketDTO);
    } catch (error) {
      throw error;
    }
  }

  static async getAllTickets() {
    try {
      return await TicketsDaoMongo.getAllTickets();
    } catch (error) {
      throw error;
    }
  }

  static async getTicketByCode(code) {
    try {
      return await TicketsDaoMongo.getTicketByCode(code);
    } catch (error) {
      throw error;
    }
  }

  static async updateTicketByCode(code, ticketData) {
    try {
      return await TicketsDaoMongo.updateTicketByCode(code, ticketData);
    } catch (error) {
      throw error;
    }
  }

  static async deleteTicketByCode(code) {
    try {
      return await TicketsDaoMongo.deleteTicketByCode(code);
    } catch (error) {
      throw error;
    }
  }
}

export default TicketsService;
