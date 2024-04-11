const express = require('express');
const app = express();
const cors = require("cors")
const rootRouter = require("./routes/index")
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})