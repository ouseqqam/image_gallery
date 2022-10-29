const {Level} = require('level')

const db = new Level('db', { valueEncoding: 'json' })


//create user table
db.put('user', {username: 'test', password: 20, blocked: 0})
db.put('user1', {username: 'hello', password: 20, blocked: 0})


//get user
db.get('user1', function (err, user) {
    console.log('user', user)
})

