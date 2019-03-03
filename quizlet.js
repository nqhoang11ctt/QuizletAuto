const puppeteer = require('puppeteer');
const USERNAME = "Hoang_Nguyen402";
const PASSWORD = "3FDzSvzhJAcd5at";
var WORD_LANGUAGE = "Vietnamese";
var DEF_LANGUAGE = "English";

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://quizlet.com/login');
    //   await page.screenshot({path: 'example.png'});

    // LOGIN
    const USERNAME_SELECTOR = "input[name='username']";
    const PASSWORD_SELECTOR = "input[name='password']";
    const SUBMIT_SELECTOR = "button[type='submit']";

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(USERNAME);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(PASSWORD);

    await page.click(SUBMIT_SELECTOR);
    await page.waitForNavigation();

    const createUrl = "https://quizlet.com/create-set";
    await page.goto(createUrl);

    // Set Study Set Title

    const TITLE_SELECTOR = "#SetPageTarget > div > div.CreateSetHeader.has-adz > div:nth-child(2) > div > div > label > div > div > div.AutoExpandTextarea-wrapper > textarea";
    await page.click(TITLE_SELECTOR);
    await page.keyboard.type("My Study Set 31");

    // Import Words and Definitions

    const BULKADD_SELECTOR = "#SetPageTarget > div > div.CreateSetHeader.has-adz > div:nth-child(3) > div > button";
    await page.click(BULKADD_SELECTOR);
    await page.keyboard.type("WORD 3\tDEF3\nWORD4\tDEF4");
    await page.waitFor(2*1000);

    const IMPORT_SELECTOR = "#SetPageTarget > div > div.ImportTerms.is-showing > div.ImportTerms-import > div > form > div.ImportTerms-importButtonWrap > button";
    await page.click(IMPORT_SELECTOR);

    await page.waitFor(4*1000); 

    // Set Word & Definition Language
    // Activate Lang selector

    await page.click(".TermRows textarea");
    // Word Lang
    await page.click("div.TermContent-side.TermContent-side--word > div > div > label > span > div > button");
    // await page.click("div.LanguageSelect-input > label > div > input");
    await page.keyboard.type(WORD_LANGUAGE);
    await page.keyboard.press("Enter");
    
    await page.waitFor(1000);

    // // Def Lang
    const DEFLANG_SELECTOR = "div.TermContent-side.TermContent-side--definition > div > div > label > span > div > button";
    await page.click(DEFLANG_SELECTOR);
    // await page.click("div.LanguageSelect-input > label > div > input");
    await page.keyboard.type(DEF_LANGUAGE);
    await page.keyboard.press("Enter");
    
    await page.waitFor(1000);
    
    

    // Finally
    const CREATE_SELECTOR  = "#SetPageTarget > div > div.CreateSetHeader.has-adz > div.CreateSetHeader-stickyPlaceholder > div > div > div > div.CreateSetHeader-infoButtonWrap > button";
    // await page.click(CREATE_SELECTOR);
    // await browser.close();
})();

// Click Record Button
// termID = 1;
//  
// document.querySelectorAll(`div.TermRows-termRowWrap[data-term-luid='term-${termId}'] button`)[1].click();