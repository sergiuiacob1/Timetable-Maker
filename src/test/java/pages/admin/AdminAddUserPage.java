package pages.admin;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class AdminAddUserPage extends WebPage {

    @FindBy()
    private WebElement emailField;

    @FindBy()
    private WebElement nameField;

    @FindBy()
    private WebElement subjectField;

    @FindBy()
    private WebElement subjectButton;

    @FindBy()
    private WebElement submitButton;

    @FindBy()
    private WebElement UsersManagementButton;

    public void insertName(String name) {
        nameField.sendKeys(name);
    }

    public void insertEmail(String email) {
        emailField.sendKeys(email);
    }

    public void insertSubject(String subjectName) {
        subjectField.sendKeys(subjectName);
    }

    public void clickSubjectButton() {
        subjectButton.click();
    }

    public void clickSubmit() {
        submitButton.click();
    }

    public WebElement getNameField() {
        return nameField;
    }

    public AdminHomePage goToAdminHomePage() { return PageFactory.initElements(driver,AdminHomePage.class); }

    public void clickUserManagementButton() {
        UsersManagementButton.click();
    }
}
