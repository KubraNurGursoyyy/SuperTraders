// ./src/modules/shares/routes.js (ESM formatı)
import { Router } from 'express';
import { updateSharePrice } from './controller.js';

const ShareRoutes = Router();

ShareRoutes.route('/shares/updatePrice').post(updateSharePrice);

export { ShareRoutes };
