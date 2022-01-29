const express = require("express");
const app = express();
const routes = require("./routes/index.routes");

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log("executando"));