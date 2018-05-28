package tests.user;

import database.Database;
import database.controllers.UserController;
import org.junit.Assert;
import pages.LoginPage;
import pages.WebPage;
import pages.admin.AdminAddUserPage;
import pages.admin.AdminHomePage;
import pages.user.UserHomePage;
import pages.user.UserProfilePage;
import tests.Test;

import java.sql.SQLException;

public class TestUserChangePassword extends Test {

    private LoginPage loginPage;
    private AdminHomePage adminHomePage;
    private AdminAddUserPage adminAddUserPage;
    private UserHomePage userHomePage;
    private UserProfilePage userProfilePage;

    private String nameInput = resourceBundle.getString("ADD_USER_NAME");
    private String emailInput = resourceBundle.getString("ADD_USER_EMAIL");
    private String subjectInput = resourceBundle.getString("ADD_USER_SUBJECT");

    private String userPassword;
    private String newUserPassword = resourceBundle.getString("USER_CHANGE_PASSWORD_NEW_PASSWORD");

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
    public void testUserChangePassword() {

        loginToAdminPage();
        goToAdminAddUserPage();
        completeFormAndSubmit();
        verifyUserExistence();
        adminHomePage.clickLogoutButton();
        waitForElementToBeVisible(loginPage.getLoginButton());
        connectAsUser();
        changePasswordAsUser();
        verifyChangePasswordDatabaseUpdate();
        userProfilePage.clickLogoutButton();
    }

    private void loginToAdminPage() {
        manageInputField();
        managePasswordField();
    }

    private void manageInputField() {
        System.out.println("S4. Insert username");
        loginPage.insertUsername(resourceBundle.getString("ADMIN_USERNAME"));
    }

    private void managePasswordField() {
        System.out.println("S7. Insert password");
        loginPage.insertPassword(resourceBundle.getString("ADMIN_PASSWORD"));
    }

    private void managePageTransition() {
        System.out.println("S8. Click login button");
        loginPage.clickLogin();
        System.out.println("S9. Go to admin homepage.");
        adminHomePage = loginPage.goToAdminHomepage();
        waitForElementToBeVisible(adminHomePage.getAddUserButton());
        System.out.println("S10. Verify admin homepage is opened.");
        Assert.assertTrue("Add user button is not displayed on Admin homepage!", WebPage.IsThisElementDisplayed(adminHomePage.getAddUserButton()));
        System.out.println("R10. Admin homepage is opened. Login have succeeded!");
    }

    private void goToAdminAddUserPage() {
        managePageTransition();
        System.out.println("S11. Check if Add user button is displayed.");
        Assert.assertTrue("Add user button is not displayed!",WebPage.IsThisElementDisplayed(adminHomePage.getAddUserButton()));
        System.out.println("R11. Add user button is displayed.");
        System.out.println("S12. Click Add user button.");
        adminHomePage.clickAddUserButton();
        System.out.println("R12. Add button has been pressed. Now opening Admin Add User Page.");
        adminAddUserPage = adminHomePage.goToAdminAddUserPage();
        adminAddUserPage = new AdminAddUserPage(driver);

        waitForElementToBeVisible(adminAddUserPage.getSubmitButton());
    }

    private void completeFormAndSubmit() {
        adminAddUserPage.insertName(nameInput);
        adminAddUserPage.insertEmail(emailInput);
        adminAddUserPage.insertSubject(subjectInput);
        adminAddUserPage.clickSubjectButton();
        adminAddUserPage.clickSubmit();
    }

    private void verifyUserExistence() {
        UserController userController = new UserController();
        try {
            Thread.sleep(1000);
            Assert.assertTrue("User does not exist in the database!", userController.userExistsInDatabase(emailInput));
            userPassword = userController.getUserPassword(emailInput);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void connectAsUser() {
        waitForElementToBeVisible(loginPage.getLoginButton());
        loginPage.insertUsername(emailInput);
        loginPage.insertPassword(userPassword);
        loginPage.clickLogin();
        userHomePage = loginPage.goToUserHomepage();
        userProfilePage = new UserProfilePage(driver);
        userProfilePage.open();
    }

    private void changePasswordAsUser() {
        waitForElementToBeVisible(userProfilePage.getChangePasswordButton());
        userProfilePage.insertOldPassword(userPassword);
        userProfilePage.insertNewPassword(newUserPassword);
        userProfilePage.insertConfirmPassword(newUserPassword);
        userProfilePage.clickChangePasswordButton();
        waitForElementToBeVisible(userProfilePage.getConfirmationNotification());
    }

    private void verifyChangePasswordDatabaseUpdate() {
        UserController userController = new UserController();
        String databasePassword;
        try {
            databasePassword = userController.getUserPassword(emailInput);
            Assert.assertEquals("User password was not changed by User Profile Change Password functionality",databasePassword,newUserPassword);
            userController.deleteUserFromDatabase(emailInput);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void tearDown() {
        closeBrowser();
        try {
            Database.closeConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
