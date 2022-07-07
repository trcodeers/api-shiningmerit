import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";


const app = express()

// To avoid the CORS error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept, Authortization, x-auth-token");  
    res.header("Access-Control-Allow-Methods","*")
    next()
})

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api/v1', routes);

app.use(error) // Registar error middleware AFTER all the middlewares, express-async-errors will monkey patch this middleware at runtime error


export default app;
