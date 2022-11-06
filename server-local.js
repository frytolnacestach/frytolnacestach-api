'use strict';

const app = require('./express/server')
const port = 3300

app.listen(port, () => console.log(`Local app listening on port ${port}!`));