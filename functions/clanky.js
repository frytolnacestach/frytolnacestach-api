exports.handler = async (event, context) => {
    const clanky = require('../json/clanky.json')
    return {
      statusCode: 200,
      body: JSON.stringify(clanky),
    };
};