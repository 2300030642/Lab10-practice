import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/springbootlibraryapi`;
export const getBooks = () => axios.get(`${BASE_URL}/all`);
export const addBook = (book) => axios.post(`${BASE_URL}`, book);
export const updateBook = (id, book) => axios.put(`${BASE_URL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
