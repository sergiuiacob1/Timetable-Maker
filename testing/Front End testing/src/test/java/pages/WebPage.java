package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import java.util.ResourceBundle;

public abstract class WebPage {

    //WebDriver este o componenta a framework-ului Selenium. Se ocupă cu deschiderea browser-ului si a actiunilor care se fac pe parcursul testului
    protected WebDriver driver;

    //ResourceBundle este un obiect care ne permite accesarea datelor din fisierul ./src/main/resources/config.properties
    protected ResourceBundle resourceBundle = ResourceBundle.getBundle("config");

    //fiecare pagina are un link(url) si un titlu
    protected String link;
    protected String title;

    //Aceasta functie va deschide o fereastra a browser-ului la pagina specificata in variabila link
    public void open() {
        driver.get(link);
        PageFactory.initElements(driver,this);
    }

    public boolean IsThisElementDisplayed(WebElement element) {
        return element.isDisplayed();
    }

    //Cu aceasta functie vom face verificarea ca o pagina WEB s-a si deschid intr-adevar atunci cand ne-am asteptat. Pentru acesta, comparam titlul paginii la care ne asteptam cu
    //cel al paginii deschise la momentul curent de catre Selenium.
    public boolean isOpened() {
        return title.equals(driver.getTitle());
    }
}
