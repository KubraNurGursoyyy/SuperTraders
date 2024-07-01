import { Router } from 'express';
import {buyShare, getShares, sellShare, updateSharePrice} from './controller.js';

const ShareRoutes = Router();

ShareRoutes.route('/shares/updatePrice').post(updateSharePrice);
ShareRoutes.route('/shares/buyShare').post(buyShare);
ShareRoutes.route('/shares/sellShare').post(sellShare);
ShareRoutes.route('/shares').get(getShares);

export { ShareRoutes };
