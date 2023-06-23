import axios, { AxiosResponse } from 'axios';

export default async function fixtureHandler(): Promise<
  AxiosResponse<any, any> | unknown
> {
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const day = new Date().getDate();
  const date = `${year}-${month}-${day}`;

  const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}`,
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
