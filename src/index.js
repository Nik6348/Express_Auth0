import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
};

app.use(auth(config));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("index", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
