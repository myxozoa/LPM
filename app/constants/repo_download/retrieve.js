// download a list of all the public lambdaschool repos
// run with node separate

const https = require('https');
const fs = require('fs');

if (!process.argv[2]) {
  throw new Error('Usage: node retrieve.js NUM_OF_PAGES');
}

const promises = [];

for (let i = 1; i <= process.argv[2]; i++) {
  promises.push(
    new Promise((resolve, reject) => {
      https
        .get(
          {
            hostname: 'api.github.com',
            path: `/users/LambdaSchool/repos?per_page=100&type=public&page=${i}`,
            headers: { 'User-Agent': 'Mozilla/5.0' }
          },
          resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', chunk => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              // console.log(data);
              resolve(data);
            });
          }
        )
        .on('error', err => {
          reject(err);
        });
    })
  );
}

const writePromises = [];

Promise.all(promises)
  .then(data => {
    data.forEach((repo, i) => {
      writePromises.push(
        new Promise((resolve, reject) => {
          fs.writeFile(`repos_page${i + 1}.json`, repo, error => {
            if (error) reject(error);
            resolve('SUCCESS');
          });
        })
      );
    });
    return false;
  })
  .catch(error => {
    console.error(error);
  });

Promise.all(writePromises)
  .then(() => {
    console.log('SUCCESS');
    return false;
  })
  .catch(error => {
    console.error(error);
    return false;
  });
