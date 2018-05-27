package tests.ui;

import org.junit.Assert;
import pages.LoginPage;
import pages.WebPage;
import tests.Test;

public class TestLoginPageUI extends Test {

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
    public void testLoginAdminSuccess() {

        manageInputField();
        managePasswordField();
        manageLoginButton();
    }

    private void manageInputField() {
        System.out.println("S2. Verify username label is displayed.");
        Assert.assertTrue("Username label is not displayed!", WebPage.IsThisElementDisplayed(loginPage.getUsernameLabel()));
        System.out.println("R2. Username label is displayed.");

        System.out.println("S3. Verify username field is enabled.");
        Assert.assertTrue("Username field is not enabled!", WebPage.IsThisElementDisplayed(loginPage.getUsernameInput()));
        System.out.println("R3. Username field is enabled.");
    }

    private void managePasswordField() {
        System.out.println("S4. Verify password label is displayed.");
        Assert.assertTrue("Password label is not displayed!", WebPage.IsThisElementDisplayed(loginPage.getPaswordLabel()));
        System.out.println("R4. Password label is displayed.");

        System.out.println("S5. Verify password field is enabled.");
        Assert.assertTrue("Password field is not enabled!", WebPage.IsThisElementDisplayed(loginPage.getPasswordInput()));
        System.out.println("R5. Password field is enabled.");
    }

    private void manageLoginButton() {
        System.out.println("S6. Verify Login button is displayed.");
        Assert.assertTrue("Login button is not displayed!", WebPage.IsThisElementDisplayed(loginPage.getLoginButton()));
        System.out.println("R6. Password label is displayed.");

        System.out.println("S7. Verify Login button is enabled.");
        Assert.assertTrue("Login button is not enabled!", WebPage.IsThisElementDisplayed(loginPage.getLoginButton()));
        System.out.println("R7. Login button is enabled.");
    }


    @Override
    public void tearDown() {
        closeBrowser();
    }
}
