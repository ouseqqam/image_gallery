const { Level } = require('level')

// Create a database
const db = new Level('./pages/api/db', { valueEncoding: 'json' })

db.open()
db.put('user1',
    {
        "username": "muser1",
        "password": "mpassword1",
        "blocked": 0,
        like: []
    }
)

db.put('user2',
    {
        "username": "muser2",
        "password": "mpassword2",
        "blocked": 0,
        like: []
    }
)

db.put('user3',
    {
        "username": "muser3",
        "password": "mpassword3",
        "blocked": 1,
        like: []
    }
)

module.exports = db;