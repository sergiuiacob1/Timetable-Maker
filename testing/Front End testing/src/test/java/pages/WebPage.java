package pages;

import org.openqa.selenium.WebDriver;

import java.util.ResourceBundle;

public abstract class WebPage {

    protected WebDriver driver;
    protected ResourceBundle resourceBundle = ResourceBundle.getBundle("config");

    protected String link;
    protected String title;

    public void open() {

    }

    public boolean isOpened() {
        return title.equals(driver.getTitle());
    }
}
