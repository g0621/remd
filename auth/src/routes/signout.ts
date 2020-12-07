import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
//will clear the cookies(jwt token) stored on client
    req.session = null;
    res.send({});
});

export {router as signoutRouter};
