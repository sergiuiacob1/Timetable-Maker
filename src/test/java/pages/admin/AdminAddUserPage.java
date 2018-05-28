package pages.admin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class AdminAddUserPage extends WebPage {

    @FindBy(css = "#email")
    private WebElement emailField;

    @FindBy(css = "#fullname")
    private WebElement nameField;

    @FindBy(css = "#subjects")
    private WebElement subjectField;

    @FindBy(css = "body > div.mdl-layout__container > div > main > div > div.add-user > div > div:nth-child(4) > div.content-dropdown.content-dropdown-style > ul > li:nth-child(1) > span")
    private WebElement subjectButton;

    @FindBy(css = "body > div.mdl-layout__container > div > main > div > div.add-user > div > div:nth-child(5) > button")
    private WebElement submitButton;

    @FindBy(css = "#users-management")
    private WebElement UsersManagementButton;

    public AdminAddUserPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

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

    public WebElement getSubmitButton() {
        return submitButton;
    }

    public AdminHomePage goToAdminHomePage() { return PageFactory.initElements(driver,AdminHomePage.class); }

    public void clickUserManagementButton() {
        UsersManagementButton.click();
    }
}
