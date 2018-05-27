package tests.admin.manage_users;

import database.Database;
import database.controllers.UserController;
import org.junit.Assert;
import pages.LoginPage;
import pages.WebPage;
import pages.admin.AdminAddUserPage;
import pages.admin.AdminHomePage;
import tests.Test;

import java.sql.SQLException;

public class TestAdminRemoveUser extends Test {

    private LoginPage loginPage;
    private AdminHomePage adminHomePage;
    private AdminAddUserPage adminAddUserPage;

    private  String nameInput = resourceBundle.getString("ADD_USER_NAME");
    private String emailInput = resourceBundle.getString("ADD_USER_EMAIL");
    private String subjectInput = resourceBundle.getString("ADD_USER_SUBJECT");

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
    public void testAdminRemoveUser() {

        loginToAdminPage();
        goToAdminAddUserPage();
        completeFormAndSubmit();
        goToUsersManagement();
        manageUserExistence();
    }

    private void loginToAdminPage() {
        manageInputField();
        managePasswordField();
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
        waitForElementToBeVisible(adminAddUserPage.getNameField());
    }

    private void completeFormAndSubmit() {
        adminAddUserPage.insertName(nameInput);
        adminAddUserPage.insertEmail(emailInput);
        adminAddUserPage.insertSubject(subjectInput);
        adminAddUserPage.clickSubjectButton();
        adminAddUserPage.clickSubmit();
    }

    private void goToUsersManagement() {
        adminAddUserPage.clickUserManagementButton();
        adminHomePage = adminAddUserPage.goToAdminHomePage();
        waitForElementToBeVisible(adminHomePage.getAddUserButton());
    }

    private void manageUserExistence() {
        UserController userController = new UserController();
        try {
            Thread.sleep(3000);
            Assert.assertTrue("User does not exist in the database!", userController.userExistsInDatabase(emailInput));

            adminHomePage.insertSearchText(nameInput);

            waitForElementToBeVisible(adminHomePage.getFirstUserSection());
            adminHomePage.clickFirstUser();

            waitForElementToBeVisible(adminHomePage.getRemoveButton());
            adminHomePage.clickRemoveButton();

            waitForElementToBeVisible(adminHomePage.getRemovePopup());
            adminHomePage.clickRemovePopupYesButton();

            Thread.sleep(3000);
            Assert.assertFalse("User is still in the database after pressing Remove button!", userController.userExistsInDatabase(emailInput));
            userController.deleteUserFromDatabase(emailInput);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void manageInputField() {
        System.out.println("S4. Insert username");
        loginPage.insertUsername(resourceBundle.getString("ADMIN_USERNAME"));
    }

    private void managePasswordField() {
        System.out.println("S7. Insert password");
        loginPage.insertUsername(resourceBundle.getString("ADMIN_PASSWORD"));
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
