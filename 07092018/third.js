const puppeteer = require('puppeteer');
let page;
let browser;

const cases = [{ s: 'abc' }, { s: 'zyx' }];

const URL = 'https://kodaktor.ru/g/autocase';

(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  await page.goto(URL);

  await page.addStyleTag({ content: '*{zoom: 100%}' });

  for (let c of cases) {
    await page.focus('#inp');
    await page.click('#inp', { clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.keyboard.type(c.s);
    await page.click('#button_do');

    const value = await page.evaluate(() => document.querySelector('#ans').value);

    console.log(value);
  }
  await browser.close();
})();
