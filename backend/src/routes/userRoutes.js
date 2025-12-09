import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => { res.send("Hello User") });
userRouter.get('/1', (req, res) => { res.send("Hello User1") });



export default userRouter;