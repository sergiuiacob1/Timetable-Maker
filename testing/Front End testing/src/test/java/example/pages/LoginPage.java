package example.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class LoginPage extends WebPage {

    @FindBy(id = "username_email_login_input")
    private WebElement usernameInput;

    @FindBy(id = "password_login_input" )
    private WebElement passwordInput;

    @FindBy(xpath = "//*[@id=\"login_form\"]/form/a")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.link = resourceBundle.getString("LOGIN_PAGE_LINK");
        this.title = resourceBundle.getString("LOGIN_PAGE_TITLE");
        PageFactory.initElements(driver, this);
        //load();
    }

    @Override
    public void open() {
        driver.get(link);
        PageFactory.initElements(driver,LoginPage.class);
    }

    public void insertUsername(String text){
        usernameInput.click();
        usernameInput.sendKeys(text);
    }

    public void insertPassword(String text) {
        passwordInput.click();
        passwordInput.sendKeys(text);
    }

    public void clickLogin() {
        loginButton.click();
    }

    public UserHomePage goToUserHomepage() {
        return PageFactory.initElements(driver,UserHomePage.class);
    }
}
