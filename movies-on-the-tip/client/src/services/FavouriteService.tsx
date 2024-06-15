import axios from 'axios';
import { Movie } from '../components/MovieList'; // Adjust the import path according to your project structure

const API_URL = 'http://localhost:4000/favourite'; // Adjust the URL if needed

export const getFavorites = () => {
    return axios.get<Movie[]>(API_URL).then((response) => response.data);
}

export const addFavorite = (movie: Omit<Movie, "id">) => {
    return axios.post<Movie>(API_URL, movie).then((response) => response.data);
}

export const removeFavorite = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`).then((response) => response.data);
};




