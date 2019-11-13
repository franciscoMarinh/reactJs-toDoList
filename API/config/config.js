module.exports = {
    "development": {
        username: "root",
        password: "root",
        database: "test",
        host: "localhost",
        dialect: "mariadb",
        secretOrKey: "batata@@",
        jwtSession: {session:false}
    },
    "test": {
        username: "root",
        password: "root",
        database: "test",
        host: "localhost",
        logging: false,
        dialect: "mariadb",
        secretOrKey: "batata@@",
        jwtSession: {session:false}    
    },
    "production": {
      "username": "root",
      "password": "root",
      "database": "test2",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
};