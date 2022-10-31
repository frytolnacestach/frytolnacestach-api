exports.handler = async (event, context) => {
  const clankyDemo = require('../json/clanky-demo.json')
  return {
    statusCode: 200,
    body: JSON.stringify(clankyDemo),
  };
};