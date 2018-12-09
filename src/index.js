const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const cors = require('cors');

require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const server = createServer();
const db = require("./db");

// var whitelist = ['http://localhost:3000', 'http://localhost:4000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     var ind = whitelist.indexOf(origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log(whitelist, ind, whitelist[ind])
//       callback(whitelist[ind])
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }

server.express.use(cookieParser());
// .use(cors(corsOptions));
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{ id, permissions, email, name }"
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
