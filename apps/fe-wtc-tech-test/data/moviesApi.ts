import axios, { AxiosResponse } from 'axios';
import { ApiEndpoints } from '../constants';
import { IMovie } from '../state/movies/types';
import Result from '../utils/Result';

const client = axios.create({
  baseURL: ApiEndpoints.BASE_URL,
});

async function makeRequest<T>(request: Promise<AxiosResponse<T>>) {
  try {
    const response = await request;

    return Result.Success(response.data);
  } catch (error) {
    return Result.Error(error.message);
  }
}

class Api {
  getMovies = async () =>
    await makeRequest<IMovie[]>(client.get(ApiEndpoints.GET_MOVIES));

  updateMovie = async (imdbID: string, saved: boolean, watched) => {
    const url = `${ApiEndpoints.UPDATE_MOVIE}/${imdbID}`;

    const data = new URLSearchParams();
    data.append('saved', saved.toString());
    data.append('watched', watched.toString());

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return await makeRequest(client.put(url, data, config));
  };
}

export default new Api();
