const express = require('express');
const app = express();
const routes = require('./routes/index');
require('dotenv').config();


async function main() {
    await routes(app);
    const port = Number(process.env.PORT) || 3001;

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.get('/animal/:animalId', (req, res) => {
        res.sendFile(__dirname + '/public/animal.html');
    });

    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
}

main();
