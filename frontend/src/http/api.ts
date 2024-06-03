import useTokenStore from "@/store";
import { Book } from "@/type";
import axios from "axios";


const api = axios.create({


    baseURL: 'http://localhost:5523',
    headers: {
        "Content-Type": 'application/json'
    }
})
export const login = async (data: { email: string; password: string }) => {
    const response = await api.post('/api/users/login', data);
    return {
        token: response.data.accessToken,
        userId: response.data.userId
    };
};




export const register = async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/users/register', data)
    return response.data


}
export const getbooks = async () => api.get('/api/books')
export const getUserBooks = async (userId: string) => {
    const response = await axios.get(`/api/books/user/${userId}`);
    console.log(response);

    return response.data;
};



api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`

    }
    return config;
})

export const createBook = async (data: FormData) =>
    api.post('/api/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const deleteBook = async (bookId: string) => {
    const response = await api.delete(`/api/books/${bookId}`);
    return response.data;
};

interface GetSingleBookParams {
    bookId: string;
}

export const getSingleBook = async (params: GetSingleBookParams): Promise<Book> => {
    const response = await axios.get(`/api/books/${params.bookId}`);
    return response.data;
};


