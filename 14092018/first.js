const Timer = require('timerpromise');

(async () => {
  const t1 = new Timer(3);
  console.time('overall');

  console.time('t1');
  let res1 = await t1.start;
  console.timeEnd('t1');

  const t2 = new Timer(2);
  console.time('t2');
  let res2 = await t2.start;
  console.timeEnd('t2');

  console.timeEnd('overall');
})();
