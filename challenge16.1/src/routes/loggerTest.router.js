// loggerTest.router.js
import {Router} from 'express'
import logger from '../logger.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    logger.debug('Este es un mensaje de debug (solo en desarrollo)');
    logger.http('Este es un mensaje HTTP');
    logger.info('Este es un mensaje de información');
    logger.warn('Este es un mensaje de advertencia');
    logger.error('Este es un mensaje de error');
    logger.fatal('Este es un mensaje fatal');

    res.status(200).json({ message: 'Logs de prueba generados' });
  } catch (error) {
    logger.error(`Error en /loggerTest: ${error.message}`);
    next(error);
  }
});

export default router;
