package tests;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ResourceBundle;

public abstract class Test {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected ResourceBundle resourceBundle = ResourceBundle.getBundle("config");

    //Aceasta functie se executa mereu la inceputul fiecarui test. Aici vom deschide browser-ul, vom naviga la pagina care incepe testul, vom crea o conexiune la baza de date etc.
    //De cele mai multe ori, setup va contine un apel la openBrowser() si unul la openPage, in ordinea asta. Vezi exemplul.
    @Before
    public void setup() {

    }

    //Aceasta functie deschide pagina WEB de la care incepe testul
    public void openPage() {

    }

    //Aceasta functie deschide browser-ul Chrome
    public void openBrowser() {
        //pentru ca Selenium sa poata deschide browser-ul Chrome, este nevoie de un driver (chromedriver.exe) care este inclus in folder-ul proiectului
        System.setProperty("webdriver.chrome.driver", resourceBundle.getString("PATH_TO_CHROMEDRIVER_LINUX")); //se seteaza calea spre Chrome driver. Este cea specificata in fisierul config.properties
        driver = new ChromeDriver(); //se creaza o noua instanta a driver-ului Selenium care va rula folosind Chrome.
        driver.manage().window().maximize(); //setam browser-ul in full screen
        //definim un waiter cu ajutorul caruia vom face ca Selenium sa astepte un numar de secunde inainte de a-si continua executia
        //Selenium va astepta maxim TIMEOUT_SECONDS incarcarea unui element pana va continua testul
        wait = new WebDriverWait(driver, new Integer(resourceBundle.getString("TIMEOUT_SECONDS")));
    }

    //Aceasta functie inchide driver-ul Selenium si, implicit, browser-ul
    public void closeBrowser() {
        driver.close();
    }

    //Aceasta functie se executa mereu la terminarea fiecarui test. Aici vom inchide browser-ul si eventuale conexiuni la baza de date.
    //De cele mai multe ori, tearDown va contine un apel la closeBrowser(). Vezi exemplul.
    @After
    public void tearDown() {

    }

    //Aceasta functie forteaza Selenium sa astepte pana cand un anumit element este vizibil in pagina.
    //Se asteapta maxim TIMEOUT_SECONDS (vezi config.properties)
    public void waitForElementToBeVisible(WebElement element) {
        wait.until(ExpectedConditions.visibilityOf(element));
    }

}
