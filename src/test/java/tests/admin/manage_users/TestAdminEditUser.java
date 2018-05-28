package tests.admin.manage_users;

import database.Database;
import database.controllers.UserController;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import pages.LoginPage;
import pages.WebPage;
import pages.admin.AdminAddUserPage;
import pages.admin.AdminHomePage;
import tests.Test;

import java.sql.SQLException;

public class TestAdminEditUser extends Test {

    private LoginPage loginPage;
    private AdminHomePage adminHomePage;
    private AdminAddUserPage adminAddUserPage;

    private  String nameInput = resourceBundle.getString("ADD_USER_NAME");
    private String emailInput = resourceBundle.getString("ADD_USER_EMAIL");
    private String subjectInput = resourceBundle.getString("ADD_USER_SUBJECT");

    private String newNameInput = resourceBundle.getString("EDIT_USER_NAME");
    private String newEmailInput = resourceBundle.getString("EDIT_USER_EMAIL");

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
    public void testAdminEditUser() {

        loginToAdminPage();
        goToAdminAddUserPage();
        completeFormAndSubmit();
        goToUsersManagement();
        manageUserEdit();
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
        //adminAddUserPage = adminHomePage.goToAdminAddUserPage();
        adminAddUserPage = new AdminAddUserPage(driver);
        waitForElementToBeVisible(adminAddUserPage.getNameField());
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

    private void goToUsersManagement() {
        System.out.println("S18. Click user management button.");
        adminAddUserPage.clickUserManagementButton();
        adminHomePage = adminAddUserPage.goToAdminHomePage();
        waitForElementToBeVisible(adminHomePage.getAddUserButton());
        System.out.println("R18. User management page is now open.");
    }

    private void manageUserEdit() {
        UserController userController = new UserController();
        String oldName, newName;
        int userId;
        try {
            Thread.sleep(1000);
            Assert.assertTrue("User does not exist in the database!", userController.userExistsInDatabase(emailInput));

            oldName = userController.getUserFullName(emailInput);
            userId = userController.getUserId(emailInput);

            System.out.println("S19. Search the new user. Type into search bar: " + nameInput);
            adminHomePage.insertSearchText(nameInput);

            System.out.println("S20. Click the first user in the list.");
            waitForElementToBeVisible(adminHomePage.getFirstUserSection());
            adminHomePage.clickFirstUser();

            System.out.println("S21. Click edit user button");
            adminHomePage.clickEditUserButton();
            waitForElementToBeVisible(adminHomePage.getEditPopup());

            System.out.println("R21. An edit popup is displayed.");
            //adminHomePage.insertTextEditPopupEmailField(newEmailInput);

            System.out.println("S22. Clear email input and insert: " + newEmailInput);
            WebElement emailEditField = driver.findElement(By.id("edit-email-" + userId));
            emailEditField.clear();
            emailEditField.sendKeys(newEmailInput);

            System.out.println("S23. Click confirm button.");
            adminHomePage.clickEditPopupConfirmButton();

            Thread.sleep(1000);

            newName = userController.getUserFullName(newEmailInput);

            Assert.assertEquals("User email was not modified by Admin Edit User functionality!",oldName,newName);

            userController.deleteUserFromDatabase(newEmailInput);
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
