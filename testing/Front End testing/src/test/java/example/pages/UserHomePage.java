package example.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class UserHomePage extends WebPage {

    @FindBy( css = "#header > ul > li:nth-child(6) > a")
    private WebElement profileButton;

    public UserHomePage(WebDriver driver) {
        this.driver = driver;
        this.link = resourceBundle.getString("USER_HOME_PAGE_LINK");
        this.title = resourceBundle.getString("USER_HOME_PAGE_TITLE");
        PageFactory.initElements(driver, this);
    }

    public boolean profileButtonIsDisplayed() {
        return profileButton.isDisplayed();
    }

    public WebElement getProfileButton() {
        return profileButton;
    }
}
