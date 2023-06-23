import axios, { AxiosResponse } from 'axios';

export default async function oddsByFixtureIdHanlder(
  id: string
): Promise<AxiosResponse<any, any> | unknown> {
  const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v3/odds?fixture=${id}`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
