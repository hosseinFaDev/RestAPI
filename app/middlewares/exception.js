module.exports = (app)=> {
app.use((err,req,res,next) => {
    const status = err.status || 500 ;
    res.status(status).send({
        code : 'Exception',
        status ,
        en_message : err.message,
        fa_message : 'خطایی در سرور رخ داده'

    })
})
}