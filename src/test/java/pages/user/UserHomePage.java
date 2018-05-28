package pages.user;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class UserHomePage extends WebPage {

    @FindBy(css = "#logout")
    private WebElement logoutButton;

    @FindBy(css = "body > div > div > header > div > nav > a:nth-child(3)")
    private WebElement myProfileButton;


    public WebElement getLogoutButton() {
        return logoutButton;
    }

    public void clickMyProfileButton() {
        myProfileButton.click();
    }

    public void clickLogoutButton() {
        logoutButton.click();
    }

    public UserProfilePage goToUserProfilePage(){ return PageFactory.initElements(driver,UserProfilePage.class);};
}
