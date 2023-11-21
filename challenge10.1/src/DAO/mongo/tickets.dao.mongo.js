import TicketModel from './models/tickets.model.js';

class TicketsDaoMongo {
  static async createTicket(ticketData) {
    try {
      const newTicket = new Ticket(ticketData);
      return await newTicket.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllTickets() {
    try {
      return await Ticket.find();
    } catch (error) {
      throw error;
    }
  }

  static async getTicketByCode(code) {
    try {
      return await Ticket.findOne({ code });
    } catch (error) {
      throw error;
    }
  }

  static async updateTicketByCode(code, ticketData) {
    try {
      return await Ticket.findOneAndUpdate({ code }, ticketData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async deleteTicketByCode(code) {
    try {
      return await Ticket.findOneAndRemove({ code });
    } catch (error) {
      throw error;
    }
  }
}

export default TicketsDaoMongo;
