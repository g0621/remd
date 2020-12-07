import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the post is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/posts/${id}`).send().expect(404);
});

it('returns the post if the post is found', async () => {

  const response = await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkf',
      link : 'ehehehehe',
      about : 'asdasdasdasdasdasdasdad'
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/posts/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual('asldkf');
  expect(ticketResponse.body.about).toEqual('asdasdasdasdasdasdasdad');
});
