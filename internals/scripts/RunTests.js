import path from 'path';

import spawn from 'cross-spawn';

const pattern = process.argv[2] === 'e2e'
  ? 'test/e2e/.+\\.test\\.js'
  : 'test/(?!e2e/)[^/]+/.+\\.test\\.js$';

const result = spawn.sync(
  path.normalize('./node_modules/.bin/jest'),
  [pattern, ...process.argv.slice(2)],
  { stdio: 'inherit' }
);

process.exit(result.status);
