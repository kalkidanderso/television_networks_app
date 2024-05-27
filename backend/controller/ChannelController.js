import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllChannels = async (req, res) => {
  try {
    const channels = await prisma.channel.findMany();
    res.status(200).json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await prisma.channel.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error('Error fetching channel by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getChannelGrowth = async (req, res) => {
   
    try {
      const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      const previousMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
  
      const channelsCurrentMonth = await prisma.channel.count({
        where: {
          created_at: {
            gte: currentMonthStart,
          },
        },
      });
  
      const channelsPreviousMonth = await prisma.channel.count({
        where: {
          created_at: {
            gte: previousMonthStart,
            lt: currentMonthStart,
          },
        },
      });
  
      res.status(200).json({ channelsCurrentMonth, channelsPreviousMonth });
    } catch (error) {
      console.error('Error fetching channel growth:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

export const addChannel = async (req, res) => {
  try {
    const newChannel = await prisma.channel.create({
      data: req.body
    });
    res.status(201).json(newChannel);
  } catch (error) {
    console.error('Error adding channel:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const updatedChannel = await prisma.channel.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json(updatedChannel);
  } catch (error) {
    console.error('Error updating channel:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    await prisma.channel.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(200).json({ message: 'Channel deleted' });
  } catch (error) {
    console.error('Error deleting channel:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
