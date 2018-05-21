package example.tests;

import example.pages.LoginPage;
import example.pages.UserHomePage;
import org.junit.Assert;
import org.openqa.selenium.support.ui.ExpectedConditions;
import tests.Test;

public class TestLoginFunctionality extends Test {

    private LoginPage loginPage;
    private UserHomePage userHomePage;

    @Override
    public void setup() {
        openBrowser();
        openPage();
    }

    public void openPage() {
        loginPage = new LoginPage(driver);
        //Best practices: scrieti la consola pasii pe care ii executati (S - steps) si raspunsurile/rezultatul executiei acestora (R) pentru a va usura debug-ul testelor
        System.out.println("S1. Open login page.");
        loginPage.open();
        Assert.assertTrue("Login page was not opened!", loginPage.isOpened());
        System.out.println("R1. Login page has been opened.");
    }

    //Fiecare clasa de test are cel putin o metoda cu addnotarea @Test (addnotare importanta, nu uitati de ea!)
    //Se poate considera ca o astfel de clasa reprezinta o suita de teste, iar fiecare functie @Test este un test case.
    //O astfel de clasa poate avea mai multe metode @Test. Aceste functii sunt cele care fac, de fapt, testarea.

    @org.junit.Test
    public void testLoginFunctionality() {

        //Best practices: nu includeti Thread.sleep in varianta finala a testelor, ci doar ca sa vedeti cum functioneaza testul sau pentru demo-uri.
        //Daca asteptati cu Thread.sleep incarcarea paginilor, este posibil ca testele sa pice nejustificat pentru ca a durat un pic mai mult decat v-ati asteptat ca sa se incarce pagina.
        //Thread.sleep folosit in moduri nejustificate incetineste procesul de testare si de integrare.

        //try {
        //    Thread.sleep(2000);


            System.out.println("S2. Enter credentials into fields.");
            loginPage.insertUsername("test");
            loginPage.insertPassword("test");

            System.out.println("S3. Press LOGIN button.");

            //Thread.sleep(2000);

            loginPage.clickLogin();

            userHomePage = loginPage.goToUserHomepage();


            //Asteptati incarcarea paginilor sau incarcarea anumitor elemente folosind waitForElementToBeVisible()!
            waitForElementToBeVisible(userHomePage.getProfileButton());

            //Daca un assert pica, se va afisa la consola mesajul setat ca prim parametru.
            Assert.assertTrue("Login have failed! User homepage should have opened!", userHomePage.isOpened());
            Assert.assertTrue("Login have failed! User homepage is opened, but Profile button is not displayed!", userHomePage.profileButtonIsDisplayed());


            System.out.println("R3. Login button has been pressed. User home page is now opened.");

        /*    Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/

    }

    @Override
    public void tearDown() {
        closeBrowser();
    }
}
