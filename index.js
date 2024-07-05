const express = require('express');
const app = express();
const path = require('path');
const port = 4400;
const host = 'localhost';

// for json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./routes/userRoutes')
app.use(userRouter)

app.listen(port, host, () => {
    console.log('listening on port ' + port);
});