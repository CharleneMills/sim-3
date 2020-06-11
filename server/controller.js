const bcrypt = require("bcrypt")


module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db")
    const { username, password} = req.body
    const profilePic = `https://robohash.org/${username}.png?set=set4`
    const usernameResult = await db.get_user(username)
    if (usernameResult[0]) {
      return res.status(409).send("Username taken")
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user = await db.register_user([username, hash, profilePic])
    delete user[0].hash
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
           delete user[0].password
            req.session.user = user[0]
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
    console.log(req.session.user)
    if (!req.session.user) {
      return res.status(401).send("User not found.")
    }
    delete user[0].hash
    res.status(200).send(req.session.user)
  },
  getPosts: (req, res) => {
    console.log(req.query)
    const {filter} = req.query
    const db = req.app.get("db")
    
    if (filter){
      console.log(filter)
      db.get_posts_filter(filter)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(500).send(err))
    }else{
    
      db.get_posts()
        .then((results) => res.status(200).send(results))
        .catch((err) => res.status(500).send(err))
    }
  },
  getPost: (req, res) => {
    const db = req.app.get("db")
    const {id} = req.params

    db.get_post(id)
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err))
  },
  newPost: (req, res) => {
    const db = req.app.get('db')
    const {title, img, content, user_id} = req.body

    db.new_post(title, img, content, user_id)
        .then(post => res.status(200).send(post))
        .catch(err => res.status(500).send(err));
  }

}
