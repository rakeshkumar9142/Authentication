import express from "express";
import {port} from "./config/env.js";

const app = express();

app.use(express.json());

// Routes

// Error Handling

// App Listen

app.listen(port, () => {
    console.log(`Server Runing on port  :${port}`);
})