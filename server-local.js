'use strict';

const app = require('./express/server');

app.listen(3300, () => console.log('Local app listening on port 3300!'));