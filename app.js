/* Node's libs */
import express from 'express'; 
import bodyParser from 'body-parser';

/* App's files */
import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(session({
//   resave: 'true',
//   saveUninitialized: 'true',
//   secret: 'c88ad32c3918a7a797f0dcc5d36c0855',
//   cookie: {
//     maxAge: 60 * 60 * 1000
//   }
// }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

/* Initialize a server instance in every core from machine */

routes(app, express);

app.listen(port, () => console.log(`Server started on ${port}`));