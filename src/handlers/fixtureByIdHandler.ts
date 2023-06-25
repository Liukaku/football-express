import axios from 'axios';
import { AxiosResponse, FixtureByIdResponse } from '../utils/types';

export default async function fixtureByIdHandler(
  id: string
): Promise<FixtureByIdResponse> {
  const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v3/fixtures`,
    params: { id: id },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST
    }
  };

  try {
    const response: AxiosResponse = await axios.request(options);
    return response.data;
  } catch (error) {
    // link in with logger e.g. kibana
    console.log(error);
    console.log('handlererr');
    throw new Error(error.toString());
  }
}
