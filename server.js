const app = require('./src/http/app')

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})