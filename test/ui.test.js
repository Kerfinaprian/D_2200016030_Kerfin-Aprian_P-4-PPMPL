const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout untuk pengujian
    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('should load the Login Page', async function() {
        await driver.get('C:/Users/kerfi/OneDrive/Documents/SEMESTER 5/Pengujian dan Penjaminan Mutu Perangkat Lunak B/Praktikum D/D_Kerfin Aprian_2200016030_Prak 4/login.html');
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should validate that login button and input fields are visible', async function() {
        const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isLoginButtonDisplayed).to.be.true;

        const isUsernameDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        expect(isUsernameDisplayed).to.be.true;

        const isPasswordDisplayed = await driver.findElement(By.id('password')).isDisplayed();
        expect(isPasswordDisplayed).to.be.true;
    });

    it('should input username and password using CSS Selector and XPath', async function() {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
        // Tambahkan langkah validasi jika login berhasil
    });

    it('should display an error message for incorrect login', async function() {
        await driver.findElement(By.css('#username')).clear();
        await driver.findElement(By.xpath('//*[@id="password"]')).clear();

        await driver.findElement(By.css('#username')).sendKeys('wronguser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('wrongpassword');
        
        await driver.findElement(By.id('loginButton')).click();
        
        await driver.wait(until.elementLocated(By.id('errorMessage')), 5000);

        const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).to.equal('Invalid username or password');
    });
});
