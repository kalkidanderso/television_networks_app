const API_URL = 'http://ec2-16-171-160-178.eu-north-1.compute.amazonaws.com/movies'; // Update with your backend URL

export const fetchMovies = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
// services/movieService.js
  
export const fetchProgramGrowth = async () => {
    const response = await fetch(`${API_URL}/growth`);
    return response.json();
  };

export const fetchMovieById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};
export const fetchMovieByCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie by categories');
    }
    return response.json();
  };

  export const fetchMovieByType = async () => {
    const response = await fetch(`${API_URL}/type`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie by type');
    }
    return response.json();
  };  
  
export const createMovie = async (movie) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  return response.json();
};

export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  return response.json();
};

export const deleteMovie = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
