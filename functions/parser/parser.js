const _ = require('lodash');
const request = require('request-promise-native');
const { JSDOM } = require('jsdom');

function getText(element) {
  return _.trim(_.get(element, 'textContent'));
}

function parseItem(tr) {
  const link = _.get(tr.querySelector('.nadpis a'), 'href');
  const title = getText(tr.querySelector('.nadpis'));
  const description = getText(tr.querySelector('.popis'));
  const price = getText(tr.querySelector('.cena'));
  return {
    link,
    title,
    description,
    price,
  };
}

function parseItems() {
  const query = encodeURIComponent(process.env.QUERY);
  return request({
    method: 'GET',
    uri: `https://www.bazos.sk/search.php?hledat=${query}`,
  }).then((html) => {
    const document = _.get(new JSDOM(html), 'window.document');
    const rows = document.querySelectorAll('table.inzeraty tr:first-of-type');
    const items = _.map(rows, parseItem);
    return items;
  });
}

module.exports = {
  parseItems,
};
