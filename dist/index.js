import express from 'express';
const app = express();
const port = 5001;
app.get('/', (req, res) => {
    res.send('Typescript + Node.js + Express Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
