const bcrypt = require("bcrypt")

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db")
    const { username, password } = req.body
    const usernameResult = await db.get_user(username)
    if (usernameResult[0]) {
      return res.status(409).send("Username taken")
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user = await db.register_user([username, hash])
   // delete user[0].hash
    req.session.user = user[0]
    return res.status(200).send(req.session.user)
  },
  login: async (req, res) =>{
    const db = req.app.get('db');
    const {username, password } = req.body;

    const user = await db.get_user(username)
    if(!user[0]){
        return res.status(404).send('No user found!')
    } else {
        const authenticated = bcrypt.compareSync(password, user[0].password)
        if (authenticated) {
            req.session.user = {
                userId: user[0].user_id,
                username: user[0].username
            }
            res.status(200).send(req.session.user)
        } else {
            res.status(403).send('Username or password incorrect')
        }
    }
},
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.status(401).send("User not found.")
    }
    res.status(200).send(req.session.user)
  },
  getPosts: (req, res) => {
    const db = req.app.get("db")
    db.get_posts()
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(500).send(err))
  }
}
