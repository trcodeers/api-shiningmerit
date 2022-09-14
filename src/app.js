import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";


const app = express()

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
app.use((req, res, next) => {

    if(!process.env.NODE_ENV === 'development' && !req.get('origin')){
        
        return 
    } 
    next()

});

const whiteList = [ 'https://user-shiningmerit.herokuapp.com/', 'https://shiningmerit.com/']
const whiteList2 = ['http://localhost:3000', 'https://user-shiningmerit.herokuapp.com/', 'https://shiningmerit.com/']

app.use(cors({
    origin: process.env.NODE_ENV === 'development' ?  whiteList2 : whiteList
}));

// v1 api routes
app.use('/api/v1', routes);

app.use(error) // Registar error middleware AFTER all the middlewares, express-async-errors will monkey patch this middleware at runtime error


export default app;
