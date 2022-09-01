
module.exports.standartPlan = async (event, context, callback)=> {

  await Promise.resolve(event)
  
  callback(null, {
    statusCode: 302,
    headers: {
      Location: 'https://buy.stripe.com/test_4gw01f7nL9lT96828d',
    },
  })
  .catch(callback);
  }
  