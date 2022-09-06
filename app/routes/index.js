const userRouter = require('./user');
const sessionRouter = require('./sessions')
module.exports =(app) => {
app.use('/api/v1/user',userRouter);
app.use('/api/v1/session',sessionRouter)
};