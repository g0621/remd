import request from 'supertest';
import { app } from '../../app';
import { Post } from '../../models/post';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/posts for post requests', async () => {
  const response = await request(app).post('/api/posts').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/posts').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
        title: '',
        link : 'ehehehehe',
        about : 'asdasdasdasdasdasdasdad'
    })
    .expect(400);

  await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
        link : 'ehehehehe',
        about : 'asdasdasdasdasdasdasdad'
    })
    .expect(400);
});

it('returns an error if an link is provided', async () => {
  await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
        title: 'asldkf',
        link : '',
        about : 'asdasdasdasdasdasdasdad'
    })
    .expect(400);

  await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
        title: 'asldkf',
        about : 'asdasdasdasdasdasdasdad'
    })
    .expect(400);
});

it('creates a post with valid inputs', async () => {
  let posts = await Post.find({});
  expect(posts.length).toEqual(0);

  const title = 'asldkfj';

  await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
        title,
        link : 'ehehehehe',
        about : 'asdasdasdasdasdasdasdad'
    })
    .expect(201);

  posts = await Post.find({});
  expect(posts.length).toEqual(1);
  expect(posts[0].link).toEqual('ehehehehe');
  expect(posts[0].about).toEqual('asdasdasdasdasdasdasdad');
});

it('publishes an event', async () => {
  const title = 'asldkfj';

  await request(app)
    .post('/api/posts')
    .set('Cookie', global.signin())
    .send({
        title,
        link : 'ehehehehe',
        about : 'asdasdasdasdasdasdasdad'
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
