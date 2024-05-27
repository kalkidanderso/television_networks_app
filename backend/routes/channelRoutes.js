import express from 'express';
import { getAllChannels, getChannelById, addChannel,
     updateChannel, deleteChannel, getChannelGrowth } 
from '../controller/ChannelController.js';

const router = express.Router();

router.get('/channels', getAllChannels);
router.get('/channels/growth', getChannelGrowth);
router.get('/channels/:id', getChannelById);

router.post('/channels', addChannel);
router.patch('/channels/:id', updateChannel);
router.delete('/channels/:id', deleteChannel);

export default router;
