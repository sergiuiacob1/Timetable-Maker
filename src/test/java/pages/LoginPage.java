package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.admin.AdminHomePage;
import pages.user.UserHomePage;

public class LoginPage extends WebPage {

    @FindBy(css = "#username-input")
    private WebElement usernameInput;

    @FindBy(css = "#login-form > form > div:nth-child(1) > label")
    private WebElement usernameLabel;

    @FindBy(css = "#password-input")
    private WebElement passwordInput;

    @FindBy(css = "#login-form > form > div:nth-child(2) > label")
    private WebElement paswordLabel;

    @FindBy(css = "#login-button")
    private WebElement loginButton;

    @FindBy(css = "body > div > div > main > div > div.error-msg")
    private WebElement failLoginErrorLabel;


    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.link = resourceBundle.getString("LOGIN_PAGE_LINK_TIMETABLE");
        this.title = resourceBundle.getString("LOGIN_PAGE_TITLE_TIMETABLE");
        PageFactory.initElements(driver, this);
    }

    public void insertUsername(String text){
        //usernameInput.click();
        usernameInput.sendKeys(text);
    }

    public void insertPassword(String text) {
        //passwordInput.click();
        passwordInput.sendKeys(text);
    }

    public void clickLogin() {
        loginButton.click();
    }

    public WebElement getUsernameLabel() {
        return usernameLabel;
    }

    public WebElement getPaswordLabel() {
        return paswordLabel;
    }

    public WebElement getUsernameInput() {
        return usernameInput;
    }

    public WebElement getPasswordInput() {
        return passwordInput;
    }

    public WebElement getFailLoginErrorLabel() {
        return failLoginErrorLabel;
    }

    public UserHomePage goToUserHomepage() {
        return PageFactory.initElements(driver,UserHomePage.class);
    }
    public AdminHomePage goToAdminHomepage() { return PageFactory.initElements(driver,AdminHomePage.class); }

    public String getFailLoginErrorMessage() {
        return failLoginErrorLabel.getText();
    }

    public WebElement getLoginButton() {
        return loginButton;
    }
}
