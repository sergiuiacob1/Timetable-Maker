package example.tests;

import example.pages.LoginPage;
import example.pages.UserHomePage;
import org.junit.Assert;
import org.openqa.selenium.support.ui.ExpectedConditions;
import tests.Test;

public class TestLoginFunctionality extends Test {

    private LoginPage loginPage;

    @Override
    public void setup() {
        openBrowser();
        openPage();
    }

    public void openPage() {
        loginPage = new LoginPage(driver);
        System.out.println("S1. Open login page.");
        loginPage.open();
        Assert.assertTrue("Login page was not opened!", loginPage.isOpened());
        System.out.println("R1. Login page has been opened.");
    }

    @org.junit.Test
    public void testLoginFunctionality() {

        try {
            Thread.sleep(2000);

            System.out.println("S2. Enter credentials into fields.");
            loginPage.insertUsername("test");
            loginPage.insertPassword("test");

            System.out.println("S3. Press LOGIN button.");

            Thread.sleep(2000);

            loginPage.clickLogin();

            UserHomePage userHomePage = loginPage.goToUserHomepage();

            wait.until(ExpectedConditions.visibilityOf(userHomePage.getProfileButton()));

            Assert.assertTrue("Login have failed! User homepage should have opened!", userHomePage.isOpened());

            System.out.println("R3. Login button has been pressed. User home page is now opened.");

            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void tearDown() {
        closeBrowser();
    }
}
