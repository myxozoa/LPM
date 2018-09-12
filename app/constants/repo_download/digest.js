// create single repos.json for use in fuzzy search
// run with node separate
const fs = require('fs');

const one = require('./repos_page1.json');
const two = require('./repos_page2.json');
const three = require('./repos_page3.json');

const array = [...one, ...two, ...three];

const filtered = array.map(repo => ({
  label: repo.name,
  value: repo.html_url,
  id: repo.id
}));

const json = JSON.stringify(filtered);

fs.writeFile('./repos.json', json, err => {
  if (err) throw err;
  console.log('SUCCESS');
});
