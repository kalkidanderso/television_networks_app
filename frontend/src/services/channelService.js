const API_URL = 'http://ec2-16-171-160-178.eu-north-1.compute.amazonaws.com/channels'; // Update with your backend URL

export const fetchChannels = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// services/channelService.js
  
export const fetchChannelGrowth = async () => {
    const response = await fetch(`${API_URL}/growth`);
    return response.json();
  };
  
  

export const fetchChannelById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createChannel = async (channel) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel),
  });
  return response.json();
};

export const updateChannel = async (id, channel) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel),
  });
  return response.json();
};

export const deleteChannel = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
