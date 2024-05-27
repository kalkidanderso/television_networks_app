import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }


};

export const getCategoryWithMovieCount = async (req, res) => {
  console.log('Fetching categories with movie count...');
  try {
  const categoriesWithMovieCount = await prisma.category.findMany({
    include: {
      _count: {
        select: { movies: true },
      },
    },
  });

  const result =  categoriesWithMovieCount.map(category => ({
    name: category.name,
    movieCount: category._count.movies,
  }));

  res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching categories with movie count:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
export const getTypeWithMovieCount = async (req, res) => {
  console.log('Fetching type with movie count...');
  try {
  const typeWithMovieCount = await prisma.type.findMany({
    include: {
      _count: {
        select: { movies: true },
      },
    },
  });

  const result =  typeWithMovieCount.map(type => ({
    name: type.name,
    movieCount: type._count.movies,
  }));

  res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching categories with movie count:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}


export const getProgramGrowth = async (req, res) => {
  try {
    const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const previousMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0);

    const programsCurrentMonth = await prisma.movie.count({
      where: {
        created_at: {
          gte: currentMonthStart,
        },
      },
    });

    const programsPreviousMonth = await prisma.movie.count({
      where: {
        created_at: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
      },
    });

    res.status(200).json({ programsCurrentMonth, programsPreviousMonth });
  } catch (error) {
    console.error('Error fetching program growth:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const addMovie = async (req, res) => {
  try {
    const newMovie = await prisma.movie.create({
      data: req.body
    });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await prisma.movie.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
