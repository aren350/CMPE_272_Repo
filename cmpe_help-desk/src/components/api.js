import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Flask server

export const getTickets = () => axios.get(`${BASE_URL}/tickets`);
export const getTicketById = (id) => axios.get(`${BASE_URL}/tickets/${id}`);
export const createTicket = (data) => axios.post(`${BASE_URL}/tickets`, data);
export const updateTicket = (id, data) => axios.put(`${BASE_URL}/tickets/${id}`, data);
export const deleteTicket = (id) => axios.delete(`${BASE_URL}/tickets/${id}`);
export const signup = (data) => axios.post(`${BASE_URL}/signup`, data);