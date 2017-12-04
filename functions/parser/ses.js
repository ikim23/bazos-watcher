const Mustache = require('mustache');
const AWS = require('aws-sdk');

const FROM = process.env.SES_EMAIL;
const TO = process.env.RECEIVER_EMAIL;
const template = `<html>
<body>
  {{#items}}
  <h3>
    <a href="{{link}}">{{title}}</a>
  </h3>
  <p>{{price}}</p>
  <p>{{description}}</p>
  {{/items}}
</body>
</html>`;
const ses = new AWS.SES();

function sendEmail(items) {
  const message = Mustache.render(template, { items });
  const params = {
    Source: FROM,
    Destination: {
      ToAddresses: [TO],
    },
    Message: {
      Subject: {
        Data: `Bazos Watcher: ${items.length} new items`,
      },
      Body: {
        Html: {
          Data: message,
        },
      },
    },
  };
  return ses.sendEmail(params).promise();
}

module.exports = {
  sendEmail,
};
