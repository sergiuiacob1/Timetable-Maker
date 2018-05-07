package tests;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ResourceBundle;

public abstract class Test {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected ResourceBundle resourceBundle = ResourceBundle.getBundle("config");

    @Before
    public void setup() {

    }

    public void openPage() {

    }

    public void openBrowser() {
        System.setProperty("webdriver.chrome.driver", resourceBundle.getString("PATH_TO_CHROMEDRIVER"));
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, new Integer(resourceBundle.getString("TIMEOUT_SECONDS")));
        driver.manage().window().maximize();
    }

    public void closeBrowser() {
        driver.close();
    }

    @After
    public void tearDown() {

    }

}
