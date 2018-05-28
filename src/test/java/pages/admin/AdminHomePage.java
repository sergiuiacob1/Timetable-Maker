package pages.admin;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class AdminHomePage extends WebPage {

    @FindBy(css = "#logout")
    private WebElement logoutButton;

    @FindBy(css = "#add-user")
    private WebElement addUserButton;

    @FindBy(css = "#buttons-user0 > button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.edit-button")
    private WebElement editUserButton;

    @FindBy(css = "#sample6")
    private WebElement searchBar;

    @FindBy()
    private WebElement searchButton;

    @FindBy(css = "#buttons-user0 > button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.remove-button")
    private WebElement removeButton;

    @FindBy(css = "#user0 > span")
    private WebElement firstUserSection;

    @FindBy(css = "#dialog-remove")
    private WebElement removePopup;

    @FindBy(css = "#remove-user-yes")
    private WebElement removePopupYesButton;

    @FindBy(css = "#buttons-user0 > button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.reset-button")
    private WebElement resetPasswordButton;

    @FindBy(css = "#dialog-reset")
    private WebElement resetPasswordPopup;

    @FindBy(css = "#reset-user-yes")
    private WebElement resetPasswordPopupYesButton;

    @FindBy(css = "#panel-user0")
    private WebElement editPopup;

    @FindBy(css = "#edit-fullName-")
    private WebElement editPopupNameField;

    @FindBy(css = "#edit-email-")
    private WebElement editPopupEmailField;

    @FindBy(css = "#panel-user0 > div.mdl-card__actions.mdl-card--border > a > span")
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

    public WebElement getEditPopupNameField() {
        return editPopupNameField;
    }

    public WebElement getEditPopupEmailField() {
        return editPopupEmailField;
    }

    public void clickEditUserButton() {
        editUserButton.click();
    }

    public AdminAddUserPage goToAdminAddUserPage() { return PageFactory.initElements(driver,AdminAddUserPage.class); }
}
