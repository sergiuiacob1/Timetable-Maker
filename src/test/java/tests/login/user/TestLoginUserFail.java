package tests.login.user;

import org.junit.Assert;
import pages.LoginPage;
import pages.WebPage;
import tests.Test;

public class TestLoginUserFail extends Test {

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
    public void testLoginUserFail() {
        manageInputField();
        managePasswordField();
        manageErrorInvalidCredentials();
    }

    @org.junit.Test
    public void testLoginUserIncompleteCredentials() {
        manageInputField();
        manageErrorIncompleteCredentials();
    }

    private void manageErrorIncompleteCredentials() {
        System.out.println("S8. Click login button");
        loginPage.clickLogin();
        waitForElementToBeVisible(loginPage.getFailLoginErrorLabel());
        System.out.println("R8. Error message is displayed: " + resourceBundle.getString("LOGIN_INCOMPLETE_ERROR_MESSAGE"));
        Assert.assertTrue("Error label is not displayed!", WebPage.IsThisElementDisplayed(loginPage.getFailLoginErrorLabel()));
        Assert.assertEquals("Error message is not as expected! Expected: " +
                        resourceBundle.getString("LOGIN_INCOMPLETE_ERROR_MESSAGE") + ";\n" +
                        "Actual: " + loginPage.getFailLoginErrorMessage() + ";\n",
                loginPage.getFailLoginErrorMessage(), resourceBundle.getString("LOGIN_INCOMPLETE_ERROR_MESSAGE"));
    }


    private void manageErrorInvalidCredentials() {
        System.out.println("S8. Click login button");
        loginPage.clickLogin();
        waitForElementToBeVisible(loginPage.getFailLoginErrorLabel());
        System.out.println("R8. Error message is displayed: " + resourceBundle.getString("LOGIN_FAIL_ERROR_MESSAGE"));
        Assert.assertTrue("Error label is not displayed!", WebPage.IsThisElementDisplayed(loginPage.getFailLoginErrorLabel()));
        Assert.assertEquals("Error message is not as expected! Expected: " +
                          resourceBundle.getString("LOGIN_FAIL_ERROR_MESSAGE") + ";\n" +
                          "Actual: " + loginPage.getFailLoginErrorMessage() + ";\n",
                loginPage.getFailLoginErrorMessage(), resourceBundle.getString("LOGIN_FAIL_ERROR_MESSAGE"));
    }

    private void manageInputField() {

        System.out.println("S4. Insert username");
        loginPage.insertUsername(resourceBundle.getString("USER_FAIL_USERNAME"));
    }

    private void managePasswordField() {

        System.out.println("S7. Insert password");
        loginPage.insertPassword(resourceBundle.getString("USER_FAIL_PASSWORD"));
    }


    @Override
    public void tearDown() {
        closeBrowser();
    }
}
