require('dotenv').config();
const express = require("express")
const session = require("express-session")
const massive = require("massive")
const app = express()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

//CONTROLLERS
const authCtrl = require("./controller")


//MIDDLEWARE
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

//DB CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db)
  console.log("Database connected")
  app.listen(SERVER_PORT, () =>
    console.log(`Server listening on ${SERVER_PORT}`)
  )
})

//ENDPOINTS
//AUTH ENDPOINTS
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.get("/auth/user", authCtrl.getUser)
app.get('/api/posts', authCtrl.getPosts)
app.get('/api/post/:id', authCtrl.getPost)