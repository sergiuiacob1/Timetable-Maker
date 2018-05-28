package pages.user;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class UserProfilePage extends WebPage {

    @FindBy(css = "#old-pass")
    private WebElement oldPasswordField;

    @FindBy(css = "#new-pass")
    private WebElement newPasswordField;

    @FindBy(css = "#confirm-new-pass")
    private WebElement confirmPasswordField;

    @FindBy(css = "#change-pass")
    private WebElement changePasswordButton;

    @FindBy(css = "body > div > div > header > div > nav > a:nth-child(4)")
    private WebElement logoutButton;

    @FindBy(css = "#notification > div")
    private WebElement confirmationNotification;

    public UserProfilePage(WebDriver driver) {
        this.driver = driver;
        this.link = resourceBundle.getString("USER_PROFILE_LINK");
        PageFactory.initElements(driver,this);
    }

    public WebElement getChangePasswordButton() {
        return changePasswordButton;
    }

    public void clickChangePasswordButton() {
        changePasswordButton.click();
    }

    public void clickLogoutButton() {
        logoutButton.click();
    }


    public WebElement getConfirmationNotification() {
        return confirmationNotification;
    }

    public void insertOldPassword(String input) {
        oldPasswordField.sendKeys(input);
    }

    public void insertNewPassword(String input) {
        newPasswordField.sendKeys(input);
    }

    public void insertConfirmPassword(String input) {
        confirmPasswordField.sendKeys(input);
    }
}
