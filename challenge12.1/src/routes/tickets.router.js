import {Router} from 'express';
import {createTicket, getAllTickets, getTicketByCode, updateTicketByCode, deleteTicketByCode} from '../controllers/tickets.controller.js';

const router = Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/:code', getTicketByCode);
router.put('/:code', updateTicketByCode);
router.delete('/:code', deleteTicketByCode);

export default router;
