const _ = require('lodash');
const AWS = require('aws-sdk');

const TABLE_BAZOS = process.env.TABLE_BAZOS;
const docClient = new AWS.DynamoDB.DocumentClient();

function scanItems() {
  return docClient.scan({ TableName: TABLE_BAZOS }).promise()
    .then(data => Promise.resolve(_.get(data, 'Items', [])));
}

function batchPutItems(items) {
  const putRequestItems = _.map(items, item => _.set({}, 'PutRequest.Item', item));
  const params = _.set({}, `RequestItems.${TABLE_BAZOS}`, putRequestItems);
  return docClient.batchWrite(params).promise()
    .then(data => Promise.resolve(_.get(data, `Responses.${TABLE_BAZOS}`, [])));
}

module.exports = {
  scanItems,
  batchPutItems,
};
