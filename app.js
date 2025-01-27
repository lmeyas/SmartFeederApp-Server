/* Node's libs */
import express from 'express'; 
import bodyParser from 'body-parser';
import RED from 'node-red';

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

/**
 *   NODE RED 
 */
// // Create the settings object - see default settings.js file for other options
// var settings = {
//   httpAdminRoot:"/red",
//   httpNodeRoot: "/api",
//   userDir:"/home/nol/.nodered/",
//   functionGlobalContext: { }    // enables global context
// };

// // Initialise the runtime with a server and settings
// RED.init(server,settings);

// // Serve the editor UI from /red
// app.use(settings.httpAdminRoot,RED.httpAdmin);

// // Serve the http nodes UI from /api
// app.use(settings.httpNodeRoot,RED.httpNode);

/**
 * até aqui 
 */

app.listen(port, () => console.log(`Server started on ${port}`));

// Start the runtime
// RED.start();