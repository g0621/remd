import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';
import {natsWrapper} from '../../nats-wrapper';

it('make post inactive on delete ', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    const resp = await request(app)
        .delete(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(resp.body.isActive).toBeFalsy()
});

it('publishes an event on delete', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            link : 'ehehehehe',
            about : 'asdasdasdasdasdasdasdad'
        });

    const resp = await request(app)
        .delete(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});