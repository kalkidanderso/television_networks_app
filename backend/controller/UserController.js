import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getUserGrowth = async (req, res) => {
    try {
      const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      const previousMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
  
      const usersCurrentMonth = await prisma.user.count({
        where: {
          created_at: {
            gte: currentMonthStart,
          },
        },
      });
  
      const usersPreviousMonth = await prisma.user.count({
        where: {
          created_at: {
            gte: previousMonthStart,
            lt: currentMonthStart,
          },
        },
      });
  
      res.status(200).json({ usersCurrentMonth, usersPreviousMonth });
    } catch (error) {
      console.error('Error fetching user growth:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

export const addUser = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: req.body
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
