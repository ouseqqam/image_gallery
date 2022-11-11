const { Level } = require('level')

// Create a database
const db = new Level('./pages/api/db', { valueEncoding: 'json' })

db.open()
db.put('muser1',
    {
        "username": "muser1",
        "password": "mpassword1",
        "blocked": 0,
        like: []
    }
)

db.put('muser2',
    {
        "username": "muser2",
        "password": "mpassword2",
        "blocked": 0,
        like: []
    }
)

db.put('muser3',
    {
        "username": "muser3",
        "password": "mpassword3",
        "blocked": 1,
        like: []
    }
)

module.exports = db;