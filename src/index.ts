// const express = require("express")
import express, { Application, Request, Response, NextFunction } from "express"; // karena pakai typescript, bisa menggunakan import

const app: Application = express();
const port = 4000;

app.use("/health", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: "200", data: "Hello World" });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
