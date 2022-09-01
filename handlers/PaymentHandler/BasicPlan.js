
module.exports.basicPlan = async (event, context, callback)=> {

await Promise.resolve(event)

callback(null, {
  statusCode: 302,
  headers: {
    Location: 'https://buy.stripe.com/test_00g8xLeQdgOl5TW6oq',
  },
})
.catch(callback);
}
