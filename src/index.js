const express = require("express");
const app = express();
const routes = require("./routes/index.routes");
const { getData } = require("./utils/function");

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  const user = getData();
  return res.status(200).send({ message: user });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log("executando"));
