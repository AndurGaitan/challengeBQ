import TicketModel from './models/tickets.model.js';

export default class Ticket {
  create = async(ticketData) =>{
    try {
      const newTicket = new TicketModel(ticketData);
      return await newTicket.save();
    } catch (error) {
      throw error;
    }

  }
  
  get = async() => {
    try {
      return await TicketModel.find();
    } catch (error) {
      throw error;
    }
  }

  getById = async(code) => {
    try {
      return await TicketModel.findOne({ code });
    } catch (error) {
      throw error;
    }
  }

  update = async(code, ticketData) => {
    try {
      return await TicketModel.findOneAndUpdate({ code }, ticketData, { new: true });
    } catch (error) {
      throw error;
    }

  }

  delete = async(code) => {
    try {
      return await TicketModel.findOneAndRemove({ code });
    } catch (error) {
      throw error;
    }
  }

}

 


