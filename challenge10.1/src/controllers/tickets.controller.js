import TicketsService from "../services/tickets.services.js"

const ticketsService = new TicketsService()

export const createTicket = async(req, res) => {
    try {
      const newTicket = await ticketsService.create(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export const getAllTickets = async(req, res) => {
    try {
      const allTickets = await ticketsService.get();
      res.status(200).json(allTickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export const getTicketByCode = async(req, res) => {
    try {
      const ticket = await ticketsService.getById(req.params.code);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export const updateTicketByCode = async(req, res) => {
    try {
      const updatedTicket = await ticketsService.update(req.params.code, req.body);
      if (!updatedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export const deleteTicketByCode = async(req, res) => {
    try {
      const deletedTicket = await ticketsService.delete(req.params.code);
      if (!deletedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
