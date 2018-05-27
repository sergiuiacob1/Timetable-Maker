package pages.user;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.WebPage;

public class UserHomePage extends WebPage {

    @FindBy()
    private WebElement logoutButton;

    public WebElement getLogoutButton() {
        return logoutButton;
    }

    public void clickLogoutButton() {
        logoutButton.click();
    }
}
