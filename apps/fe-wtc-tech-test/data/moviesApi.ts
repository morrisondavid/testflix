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
    await makeRequest<IMovie[]>(client.get(ApiEndpoints.MOVIES));
}

export default new Api();
