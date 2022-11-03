const { Level } = require('level')

// Create a database
const db = new Level('./pages/api/db', { valueEncoding: 'json' })

db.put('user1',
    {
        "username": "user1",
        "password": "user1",
        "blocked": 0,
        like: []
    }
)

db.put('user2',
    {
        "username": "user2",
        "password": "user2",
        "blocked": 0
    }
)

db.put('user3',
    {
        "username": "user3",
        "password": "user3",
        "blocked": 1
    }
)

module.exports = db;