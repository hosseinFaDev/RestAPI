const express = require('express');
const app = express();
require('./bootstrap');
require('./middlewares')(app);
require('./routes')(app);

//set middleware 
require('./middlewares/404')(app);
require('./middlewares/exception')(app);

module.exports =(PORT) => {
    app.listen(PORT , () => {
        console.log(`app is runnug on port ${PORT}`)
    })
}
