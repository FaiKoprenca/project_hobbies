
module.exports.premiumPlan = async (event, context, callback)=> {

  await Promise.resolve(event)
  
  callback(null, {
    statusCode: 302,
    headers: {
      Location: 'https://buy.stripe.com/test_28o7tH6jHbu1dmofZ4',
    },
  })
  .catch(callback);
  }
  