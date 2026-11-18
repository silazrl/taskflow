const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");
const logger = require("./src/middleware/logger");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);



app.get("/", (req, res) => {
    res.send("TASKFLOW API çalışıyor!");
});


app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
});