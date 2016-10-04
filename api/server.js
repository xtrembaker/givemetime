const express = require('express')
const postgraphql = require('postgraphql').default
const gAuth = require('./auth/google-oauth')
const pgFetch = require('./auth/db-fetch')
const pgJwt = require('./auth/pg-jwt')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const env = process.env

const JWT_SECRET = 'supersecret';

// TODO: eslint
// TODO: server tests

// parse json body
app.use(bodyParser.json())

// handle auth requests
//   - get access_token from parameters
//   - check it against whatever is relevant
//   - ask the db to upsert this user
//   - create a jwt token with the user id
app.post('/jwt_auth', gAuth)
app.use(pgFetch)
app.use(pgJwt(JWT_SECRET))

const graphql = postgraphql(
    `postgres://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
    'give_me_time_public',
    {
        development: true,
        secret: JWT_SECRET,
        log: true,
        // any non logged user is not admin
        anonymousRole: 'give_me_time_user'
    }
)
// graphql endpoint
app.post('/graphql', graphql)

// graphiql (only enabled if development mode is on)
app.get('/', graphql)
app.post('/', graphql)

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(cors())

console.log('Listening to port 3000')
app.listen(3000)