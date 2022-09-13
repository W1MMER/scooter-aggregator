const app = require('express')();
const PORT = 3500

app.listen(
    PORT,
    () => console.log(`Server successfully started and is running on ${PORT}.`)
)