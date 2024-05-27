const API_URL = 'http://ec2-16-171-160-178.eu-north-1.compute.amazonaws.com/users'; // Update with your backend URL

export const fetchUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// services/userService.js

export const fetchUserGrowth = async () => {
    const response = await fetch(`${API_URL}/growth`);
    return response.json();
  };
  
  
  
export const fetchUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
