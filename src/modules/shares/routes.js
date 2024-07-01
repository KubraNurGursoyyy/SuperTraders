import { Router } from 'express';
import {buyShare, sellShare, updateSharePrice} from './controller.js';

const ShareRoutes = Router();

ShareRoutes.route('/shares/updatePrice').post(updateSharePrice);
ShareRoutes.route('/shares/buyShare').post(buyShare);
ShareRoutes.route('/shares/sellShare').post(sellShare);

export { ShareRoutes };
