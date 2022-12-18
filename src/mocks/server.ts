import express, { Express } from "express";

const app: Express = express();

app.use(function (req, res, next) {
  setTimeout(next, 300);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// app.get("/exchangerates_data/symbols", (req, res) => {
//   console.log(req.originalUrl);

//   res.send(symbols);
// });

app.listen(3000);
