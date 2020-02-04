let username = 'shashi';
let password = 'smartvoyage';
// let dbhost = 'ds159400.sample.com';
// let port = '89400';
// let dbname = 'databasename';

module.exports = {
    url: `mongodb+srv://${username}:${password}@cluster0-ddgg4.mongodb.net/test?retryWrites=true&w=majority`
};