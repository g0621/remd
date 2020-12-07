import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';
import {natsWrapper} from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/posts/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asldkf',
            link: 'ehehehehe',
            about: 'asdasdasdasdasdasdasdad'
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/posts/${id}`)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', global.signin())
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asldkf2',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(401);
});

it('returns a 400 if the user provides an invalid title or link', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(400);

    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : '',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asldkf2',
            link : 'ehehehehe2',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/posts/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('asldkf2');
    expect(ticketResponse.body.link).toEqual('ehehehehe2');
});

it('publishes an event', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asldkf2',
            link : 'ehehehehe2',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the post is inactive', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    await request(app)
        .delete(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asldkf2',
            link : 'ehehehehe2',
            about : 'asdasdasdasdasdasdasdad'
        })
        .expect(400);

});
