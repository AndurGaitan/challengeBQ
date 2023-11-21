import { Router } from 'express';
import TicketsService from '../services/tickets.services.js';

const router = Router()

router.post('/', async (req, res) => {
  try {
    const newTicket = await TicketsService.createTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allTickets = await TicketsService.getAllTickets();
    res.status(200).json(allTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:code', async (req, res) => {
  try {
    const ticket = await TicketsService.getTicketByCode(req.params.code);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:code', async (req, res) => {
  try {
    const updatedTicket = await TicketsService.updateTicketByCode(req.params.code, req.body);
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:code', async (req, res) => {
  try {
    const deletedTicket = await TicketsService.deleteTicketByCode(req.params.code);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
