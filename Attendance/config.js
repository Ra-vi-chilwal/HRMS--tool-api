//Initializing connection string
var dbConfig = {
    server: '192.168.2.5',
    authentication: {
        type: 'default',
        options: {
            userName: 'essl1',
            password: 'essl1',
        }
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        database: 'etimeweb',
        port: 1433,  //your port number,
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

module.exports = dbConfig