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
    delete user[0].hash
    req.session.user = user[0]
    return res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const db = req.app.get("db")
    const { username, password } = req.body
    const result = await db.get_user(username)
    const user = result[0]
    if (!user) {
      return res.status(401).send("User not found.")
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash)
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect Password.")
    }
    delete user.hash
    req.session.user = user
    return res.status(200).send(req.session.user)
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
    db.posts
      .get_posts()
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(500).send(err))
  }
}
