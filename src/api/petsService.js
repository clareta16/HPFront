import axiosInstance from './axiosInstance'; // Importem l'instància configurada

export const getAllPets = async () => {
  return axiosInstance.get('/pets');
};

export const createPet = async (petData) => {
  const response = await axiosInstance.post('/pets', petData); // Ara no necessitem passar el token explícitament
  return response.data;
};

export const deletePet = async (petId) => {
  return axiosInstance.delete(`/pets/${petId}`);
};

export const updatePet = async (petId, updatedData) => {
  return axiosInstance.put(`/pets/${petId}`, updatedData);
};

export const interactWithPet = async (petId, action) => {
  return axiosInstance.post(`/pets/${petId}/interact`, { action });
};
