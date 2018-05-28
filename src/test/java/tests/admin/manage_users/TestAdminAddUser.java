package tests.admin.manage_users;

import database.Database;
import database.controllers.UserController;
import org.junit.Assert;
import org.openqa.selenium.support.PageFactory;
import pages.LoginPage;
import pages.WebPage;
import pages.admin.AdminAddUserPage;
import pages.admin.AdminHomePage;
import tests.Test;

import java.awt.print.PageFormat;
import java.sql.SQLException;

public class TestAdminAddUser extends Test {

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
    public void testAdminAddUser() {

        loginToAdminPage();
        goToAdminAddUserPage();
        completeFormAndSubmit();
        verifyUserExistenceAndRollback();
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
        System.out.println("R12. Add user button has been pressed. Now opening Admin Add User Page.");
        adminAddUserPage = adminHomePage.goToAdminAddUserPage();
        adminAddUserPage = new AdminAddUserPage(driver);

        waitForElementToBeVisible(adminAddUserPage.getSubmitButton());
    }

    private void completeFormAndSubmit() {
        System.out.println("S13. Insert into name field: " + nameInput);
        adminAddUserPage.insertName(nameInput);

        System.out.println("S14. Insert into email field: " + emailInput);
        adminAddUserPage.insertEmail(emailInput);

        System.out.println("S15. Insert into subject field: " + subjectInput);
        adminAddUserPage.insertSubject(subjectInput);

        System.out.println("S16. Pick first subject.");
        adminAddUserPage.clickSubjectButton();

        System.out.println("S17. Click submit button.");
        adminAddUserPage.clickSubmit();
    }

    private void verifyUserExistenceAndRollback() {
        UserController userController = new UserController();
        try {
            Thread.sleep(1000);
            System.out.println("S18. Checking user existence in database.");
            Assert.assertTrue("User does not exist in the database!", userController.userExistsInDatabase(emailInput));
            userController.deleteUserFromDatabase(emailInput);
            System.out.println("R18. User has been added into database. Rollbacking database...");
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
