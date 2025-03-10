import api from "./api";

export const login = async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/users', { name, email, password });
    return response.data;
};