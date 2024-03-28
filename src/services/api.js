// services/api.js
import axios from 'axios';

const API_URL = 'https://giddy-moth-toga.cyclic.app/api/exam';

export const getAllExams = async () => {
  const response = await axios.get(`${API_URL}/get`);
  return response.data.exams;
};

export const getExamById = async (id) => {
  const response = await axios.get(`${API_URL}/get/${id}`);
  return response.data.exam;
};

export const createExam = async (examData) => {
  const response = await axios.post(`${API_URL}/add`, examData);
  return response.data;
};

export const updateExam = async (id, examData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, examData);
  return response.data;
};

export const deleteExam = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data.message;
};