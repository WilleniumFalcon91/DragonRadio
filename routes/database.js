//database config 
require('dotenv').config()
const pg = require('pg-promise')();
const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
}; 

module.exports = pg(dbConfig);

const db = require('./db');


class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    save() {
        if (this.user_id) {
            return db.one(`
            update users
            set 
                name=${this.name},
                email=${this.email},
            where user_id=${this.user_id}
            `);
        } else {

        
        return db.one(`
            insert into users 
            (name, email)
            values
            ('${this.name}', '${this.email}')
            returning user_id;
        `);
        }
    }
    static get(id) {
        return db.one(`
            select user_id, name, email from users where user_id=${id};
        `).then((result) => {
            let u = new User();
            u.user_id = result.user_id;
            u.name = result.name;
            u.email = result.email;
            return u;
        })
    }
}

module.exports = User;