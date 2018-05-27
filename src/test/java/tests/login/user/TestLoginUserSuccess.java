package tests.login.user;

import org.junit.Assert;
import pages.LoginPage;
import pages.user.UserHomePage;
import pages.WebPage;
import tests.Test;

public class TestLoginUserSuccess extends Test {

    private LoginPage loginPage;
    private UserHomePage userHomePage;

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
    public void testLoginUserSuccess() {
        manageInputField();
        managePasswordField();
        managePageTransition();
    }

    private void manageInputField() {
        System.out.println("S4. Insert username");
        loginPage.insertUsername(resourceBundle.getString("USER_USERNAME"));
    }

    private void managePasswordField() {
        System.out.println("S7. Insert password");
        loginPage.insertPassword(resourceBundle.getString("USER_PASSWORD"));
    }

    private void managePageTransition() {
        System.out.println("S8. Click login button");
        loginPage.clickLogin();
        System.out.println("S9. Go to user homepage.");
        userHomePage = loginPage.goToUserHomepage();
        waitForElementToBeVisible(userHomePage.getLogoutButton());
        System.out.println("S10. Verify user homepage is opened.");
        Assert.assertTrue(" User homepage is not opened! !Logout button is not displayed!",
                            WebPage.IsThisElementDisplayed(userHomePage.getLogoutButton()));
        System.out.println("R10. User homepage is opened. Login have succeeded!");
        userHomePage.clickLogoutButton();
    }

    @Override
    public void tearDown() {
        closeBrowser();
    }
}
