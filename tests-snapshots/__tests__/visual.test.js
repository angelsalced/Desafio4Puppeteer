const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Prueba de captura de pantalla', () => {
  let browser;
  let page;

  beforeAll(async function () {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async function () {
    await browser.close();
  });

  test('Captura de pantalla completa - EJERCICIO', async () => {


    //await page.goto('https://www.wikiwand.com/es/articles/The_Password_Game');        Imagen capturada, siguiente linea se comparara con este y fallara
    await page.goto('https://www.wikipedia.org/');                                      
    await page.waitForSelector('head');

    const screenshotDir = path.join(__dirname, 'screenshots');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    const imageBuffer = await page.screenshot({ path: screenshotPath, type: 'png' });
    const imageFromDisk = fs.readFileSync(screenshotPath);

    expect(imageFromDisk).toMatchImageSnapshot({
      failureThresholdType: 'pixel',
      failureThreshold: 500,
    });
  });

  test.only('Captura de un elemento en especifico - EJERCICIO 2', async () => {
    await page.goto('https://www.example.com');
    //const h1 = await page.waitForSelector('h1');                                      Elemento capturado, elemento p (def sig linea) se compara con este y falla
    const h1 = await page.waitForSelector('p');

    const screenshotDir = path.join(__dirname, 'screenshots');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    const imageBuffer = await h1.screenshot({ path: screenshotPath, type: 'png' });
    const imageFromDisk = fs.readFileSync(screenshotPath);

    expect(imageFromDisk).toMatchImageSnapshot({
      failureThresholdType: 'percent',
      failureThreshold: 0.01,
    });
  });


    
  //test ensenados en curso


  test('Captura de pantalla completa', async () => {
    await page.goto('https://www.example.com');
    await page.waitForSelector('h1');

    const screenshotDir = path.join(__dirname, 'screenshots');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    const imageBuffer = await page.screenshot({ path: screenshotPath, type: 'png' });
    const imageFromDisk = fs.readFileSync(screenshotPath);

    expect(imageFromDisk).toMatchImageSnapshot({
      failureThresholdType: 'pixel',
      failureThreshold: 500,
    });
  });

  test('Captura de un elemento en especifico', async () => {
    await page.goto('https://www.example.com');
    const h1 = await page.waitForSelector('h1');

    const screenshotDir = path.join(__dirname, 'screenshots');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    const imageBuffer = await h1.screenshot({ path: screenshotPath, type: 'png' });
    const imageFromDisk = fs.readFileSync(screenshotPath);

    expect(imageFromDisk).toMatchImageSnapshot({
      failureThresholdType: 'percent',
      failureThreshold: 0.01,
    });
  });

  test('Captura removiendo un elemento en especifico', async () => {
    await page.goto('https://www.example.com');
    await page.evaluate(()=> {
        (document.querySelectorAll("h1") || []).forEach((el)=> el.remove());
    })

    await page.waitForFunction('new Promise(resolve => setTimeout(resolve, 15000))');
   
    //const h1 = await page.waitForSelector('h1');

    /*const screenshotDir = path.join(__dirname, 'screenshots');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    const imageBuffer = await h1.screenshot({ path: screenshotPath, type: 'png' });
    const imageFromDisk = fs.readFileSync(screenshotPath);

    expect(imageFromDisk).toMatchImageSnapshot({
      failureThresholdType: 'percent',
      failureThreshold: 0.01,
    });*/
  });
});