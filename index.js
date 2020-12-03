const express = require("express");
const app = express();
const port = 4000;
const users = require("./routers/user");
const imags = require("./routers/image");
const jsonParser = express.json();

app.use(jsonParser);

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

app.use("/users", users);
app.use("/images", imags);

app.listen(port, console.log(`listening on port ${port}...`));
