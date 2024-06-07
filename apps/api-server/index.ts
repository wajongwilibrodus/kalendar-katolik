import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from 'cors';
import { saintsRouter } from "./saintsRouter";
import { createContext } from "./context";

const app = express();
app.use(cors());
const port = 8080;

export type SaintsRouter = typeof saintsRouter;

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: saintsRouter,
        createContext,
    })
);


app.get("/", (_, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
