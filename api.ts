import axios from "axios";

// TODO: Cambiar a la url por la de tu IP
const BASE_URL = "http://172.20.10.5:8080";

const api = axios.create({
  baseURL: BASE_URL,
});

export const Login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

type Student = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  age: number;
  description: string;
  password: string;
};

export const createStudent = async (student: Student, token: string) => {
  const response = await api.post("/student", student, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
