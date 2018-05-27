package pages.admin;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class AdminHomePage extends WebPage {

    @FindBy()
    private WebElement logoutButton;

    @FindBy()
    private WebElement addUserButton;

    @FindBy()
    private WebElement editUserButton;

    @FindBy()
    private WebElement searchBar;

    @FindBy()
    private WebElement searchButton;

    @FindBy()
    private WebElement removeButton;

    @FindBy()
    private WebElement firstUserSection;

    @FindBy()
    private WebElement removePopup;

    @FindBy()
    private WebElement removePopupYesButton;

    @FindBy()
    private WebElement resetPasswordButton;

    @FindBy()
    private WebElement resetPasswordPopup;

    @FindBy()
    private WebElement resetPasswordPopupYesButton;

    @FindBy()
    private WebElement editPopup;

    @FindBy()
    private WebElement editPopupNameField;

    @FindBy()
    private WebElement editPopupEmailField;

    @FindBy()
    private WebElement editPopupConfirmButton;

    public void insertTextEditPopupNameField(String input) {
        editPopupEmailField.sendKeys(input);
    }

    public void insertTextEditPopupEmailField(String input) {
        editPopupEmailField.sendKeys(input);
    }

    public void clickEditPopupConfirmButton() {
        editPopupConfirmButton.click();
    }

    public WebElement getEditPopup() {
        return editPopup;
    }

    public WebElement getAddUserButton() {
        return addUserButton;
    }

    public WebElement getEditUserButton() {
        return editUserButton;
    }

    public void clickAddUserButton() {
        addUserButton.click();
    }

    public void insertSearchText(String text) {
        searchBar.sendKeys(text);
    }

    public void clickSearchButton(){
        searchButton.click();
    }

    public void clickFirstUser() {
        firstUserSection.click();
    }

    public AdminAddUserPage goToAdminAddUserPage() { return PageFactory.initElements(driver,AdminAddUserPage.class); }

    public void clickLogoutButton() {
        logoutButton.click();
    }

    public WebElement getFirstUserSection() {
        return firstUserSection;
    }

    public WebElement getRemoveButton() {
        return removeButton;
    }

    public void clickRemoveButton() {
        removeButton.click();
    }

    public WebElement getRemovePopup() {
        return removePopup;
    }

    public WebElement getResetPasswordPopup() {
        return resetPasswordPopup;
    }

    public void clickRemovePopupYesButton() {
        removePopupYesButton.click();
    }

    public void clickResetPasswordPopupYesButton() {
        resetPasswordPopupYesButton.click();
    }

    public WebElement getResetPasswordButton() {
        return resetPasswordButton;
    }

    public void clickResetPasswordButton() {
        resetPasswordButton.click();
    }
}
