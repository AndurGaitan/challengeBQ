import TicketDTO from '../DTO/tickets.dto.js';
import {Ticket} from '../DAO/factory.js'

const TicketDao = new Ticket()

export default class TicketsService {
  create = async(objet) => {
    try {
      const newTicketDTO = new TicketDTO(
        objet.name,
        objet.description,
        objet.code,
        objet.purchase_datetime,
        objet.amount,
        objet.purchaser
      );

      return await TicketDao.create(newTicketDTO);
    } catch (error) {
      throw error;
    }
  }
  get = async() => {
    try {
      return await TicketDao.get();
    } catch (error) {
      throw error;
    }

  }

  getById = async(code) => {
    try {
      return await TicketDao.getById(code);
    } catch (error) {
      throw error;
    }

  }

  update = async(code, ticketData) => {
    try {
      return await TicketDao.update(code, ticketData);
    } catch (error) {
      throw error;
    }
  }

  delete = async(code) => {
    try {
      return await TicketDao.delete(code);
    } catch (error) {
      throw error;
    }
  }
}
