
const handleRegister = (req, res, db, bcrypt) =>{
    const {email, name, password} = req.body;
    if(!email || !password || !name){
        console.log(email)
        console.log(password)
        console.log(name)
        return res.status(400).json("Missing credentials!")
    }
    var hash = bcrypt.hashSync(password)
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      res.json(data[0].email)
    })
    db.transaction(trx=>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
   
    .catch(err => res.status(400).json(err)
}
module.exports={
    handleRegister: handleRegister
}