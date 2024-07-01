import { Router } from 'express';
import {buyShare, updateSharePrice} from './controller.js';

const ShareRoutes = Router();

ShareRoutes.route('/shares/updatePrice').post(updateSharePrice);
ShareRoutes.route('/shares/buyShare').post(buyShare);

export { ShareRoutes };
