const conn = require('./sql.js')

conn.query('select * from heros', (err, result) => {
    console.log(err);
    console.log(result);
})