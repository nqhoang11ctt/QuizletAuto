const puppeteer = require('puppeteer');
const getwords = require(__dirname + "/getwords.js");
const USERNAME = "Hoang_Nguyen402";
const PASSWORD = "3FDzSvzhJAcd5at";
var WORD_LANGUAGE = "Vietnamese";
var DEF_LANGUAGE = "English";
var wordsFile = __dirname + '/words.csv';

getwords("words.csv")
.then(
    async (words) => {
        const browser = await puppeteer.launch({
            headless: false,
            args: [ '--use-fake-ui-for-media-stream' ]
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
    
        const TITLE_SELECTOR = "div.AutoExpandTextarea-wrapper > textarea";
        await page.click(TITLE_SELECTOR);
        await page.keyboard.type("My Study Set 31");
    
        // Import Words and Definitions
    
        const BULKADD_SELECTOR = "div.CreateSetHeader > div:nth-child(3) > div > button";
        await page.click(BULKADD_SELECTOR);
        await page.keyboard.type(words);
        await page.waitFor(2*1000);
    
        const IMPORT_SELECTOR = "div.ImportTerms-importButtonWrap > button";
        await page.click(IMPORT_SELECTOR);
    
        await page.waitFor(2*1000); 
    
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
        
        // Record
    
        // Finally
        const CREATE_SELECTOR  = "div.CreateSetHeader-infoButtonWrap > button";
        // await page.click(CREATE_SELECTOR);
        // await browser.close();
    }
);

