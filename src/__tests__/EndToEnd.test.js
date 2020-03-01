import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions("http://localhost:3000/hangout", [
      "geolocation"
    ]);
    page = await browser.newPage();

    await page.goto("http://localhost:3000/hangout");
    await page.waitForSelector(".Event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const extra = await page.$(".Event .eventDetails");
    expect(extra).toBeNull();
  });

  test("user can expand an event to see its details", async () => {
    await page.click(".Event .detailsButton");
    const extra = await page.$(".Event .eventDetails");
    expect(extra).toBeDefined();
  });

  test("user can collapse an event to hide its details", async () => {
    await page.click(".Event .detailsButton");
    const eventDets = await page.$(".Event .eventDetails");
    expect(eventDets).toBeNull();
  });
});

//Scope for testing our Filter events by city
describe("filter events by city", () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions("http://localhost:3000/hangout", [
      "geolocation"
    ]);
    page = await browser.newPage();

    await page.goto("http://localhost:3000/hangout");
    await page.waitForSelector(".Event");
  });

  afterAll(() => {
    browser.close();
  });

  test("There are some events by default", async () => {
    const extra = await page.$(".Event");
    expect(extra);
  });

  test("User should see suggestions when they search for a city", async () => {
    await page.focus(".city");
    for (var i = 1; i <= 6; i++) {
      await page.keyboard.press("Backspace");
    }
    await page.keyboard.type("Munich");
    const suggestions = await page.$(".suggestions li");
    expect(suggestions);
  });

  test("User can select city from sugested list", async () => {
    await page.focus(".city");
    for (var i = 1; i <= 6; i++) {
      await page.keyboard.press("Backspace");
    }
    await page.keyboard.type("Munich");
    await page.click(".suggestions li");
  });
});
