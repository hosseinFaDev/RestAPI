const bodyParser = require('body-parser');
const CORS = require('cors');

module.exports = (app) => {
    app.use(CORS());
    app.use(bodyParser.json())
}