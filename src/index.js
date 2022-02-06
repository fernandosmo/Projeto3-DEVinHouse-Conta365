const express = require("express");
const app = express();
const routes = require("./routes/index.routes");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use(express.json());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log("executando"));
