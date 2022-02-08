import "reflect-metadata";

import "./database/connect";

import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());

app.use(routes);

app.set("port", 3000);

app.listen(app.get("port"), function () {
	console.log("Server started at port", app.get("port"));
});
