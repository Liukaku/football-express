import express from 'express';
import cors from 'cors';
import fixtureHandler from './handlers/fixturesHandler';
import jwtHandler from './handlers/jwtHandler';
import oddsByFixtureIdHanlder from './handlers/oddsByFixtureIdHandler';
import fixtureByIdHandler from './handlers/fixtureByIdHandler';
import cache from 'memory-cache';
import { FixtureByIdResponse } from './utils/types';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

api.post('/clearCache', async (req, res) => {
  // no JWT check here as this is a dev endpoint

  cache.clear();
  res.status(200).send({ message: 'Cache cleared' });
});

api.get('/getAllFixtures', async (req, res) => {
  jwtHandler(req, res);

  let cacheKey = 'allFixtures';
  let cachedBody = cache.get(cacheKey);
  if (cachedBody) {
    console.log('used cache all fixtures');
    res.status(200).send({ message: JSON.stringify(cachedBody) });
    return;
  }

  try {
    const response = await fixtureHandler();
    cache.put(cacheKey, response, 1000 * 60 * 60);

    res.status(200).send({ message: JSON.stringify(response) });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

api.get('/fixtures/:id', async (req, res) => {
  jwtHandler(req, res);

  let cacheKey = req.params.id;
  let cachedBody = cache.get(cacheKey);

  if (cachedBody) {
    res.status(200).send({ message: JSON.stringify(cachedBody) });
    return;
  }

  try {
    const fixRes: FixtureByIdResponse = await fixtureByIdHandler(req.params.id);
    const oddsRes = await oddsByFixtureIdHanlder(req.params.id);
    if (fixRes.response.length !== 0) {
      cache.put(cacheKey, { fixRes, oddsRes }, 1000 * 60 * 60);
    }
    res.status(200).send({ message: JSON.stringify({ fixRes, oddsRes }) });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Version the api
app.use('/api/v1', api);
