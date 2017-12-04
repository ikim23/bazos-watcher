const _ = require('lodash');
const { parseItems } = require('./parser');
const { scanItems, batchPutItems } = require('./db');
const { sendEmail } = require('./ses');

module.exports.handler = (event, context, callback) => {
  parseItems()
    .then((items) => {
      console.log(JSON.stringify(items));
      return scanItems()
        .then((existingItems) => {
          const links = _.map(existingItems, 'link');
          const newItems = _.filter(items, item => !_.includes(links, item.link));
          console.log('New items:');
          console.log(JSON.stringify(newItems));
          if (!_.isEmpty(newItems)) {
            return Promise.all([
              batchPutItems(newItems),
              sendEmail(newItems),
            ]);
          }
          return Promise.resolve();
        });
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      callback(error);
    });
};
