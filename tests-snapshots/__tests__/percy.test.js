const puppeteer = require('puppeteer');
const percySnapshot = require("@percy/puppeteer");

describe("Percy test", () => {
    let browser;
    let page;
  
    beforeAll(async function () {
      browser = await puppeteer.launch({ headless: true });
      page = await browser.newPage();
    });
  
    afterAll(async function () {
      await browser.close();
    });

    it("Captura de Elemento Angel Salcedo", async () => {
        await page.goto('https://www.wikipedia.org/');
        await page.waitForSelector('head');
        await percySnapshot(page, "Ejercicio Percy");

    });

});