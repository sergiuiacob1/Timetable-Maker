package example.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import pages.WebPage;

public class LoginPage extends WebPage {

    //Fiecare clasa care extinde WebPage trebuie sa contina urmatoarele 4 sectiuni:

    //1. Declararea elementelor prezente pe pagina relevante pentru testare
    //Orice WebElement va fi insotit de o addnotare care contine un identificator spre acel element. Se pot folosi xpaths, css selectors, nume de clase sau id-uri.
    //Cel mai bine este ca aceste elemente sa fie identificate prin id-uri, acolo unde se poate. Xpath-urile se vor modifica in momentul in care structura paginii se modifica.

    @FindBy(id = "username_email_login_input")
    private WebElement usernameInput;

    @FindBy(id = "password_login_input" )
    private WebElement passwordInput;

    @FindBy(xpath = "//*[@id=\"login_form\"]/form/a")
    private WebElement loginButton;

    //2. Constructor

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        //pentru fiecare astfel de pagina, specificati in ./src/main/resources/config.properties url-ul si titlul
        this.link = resourceBundle.getString("LOGIN_PAGE_LINK");
        this.title = resourceBundle.getString("LOGIN_PAGE_TITLE");
        PageFactory.initElements(driver, this);
    }

    //3. Functii de interactiune cu elementele paginii
    //Pentru fiecare WebElement declarat mai sus, scrieti functii de interactiune cu acesta


    //de exemplu, scrieti o functie care scrie un text intr-un field.
    public void insertUsername(String text){
        usernameInput.click();
        usernameInput.sendKeys(text);
    }

    public void insertPassword(String text) {
        passwordInput.click();
        passwordInput.sendKeys(text);
    }

    //sau functii care apasa pe butoane
    public void clickLogin() {
        loginButton.click();
    }


    //4. Functii de interactiune cu alte pagini
    //Scrieti cate o astfel de functie pentru fiecare pagina care poate fi accesata in timpul testelor de pe aceasta pagina

    public UserHomePage goToUserHomepage() {
        return PageFactory.initElements(driver,UserHomePage.class);
    }
}
