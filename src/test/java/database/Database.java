package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class Database {

    private static ResourceBundle resourceBundle = ResourceBundle.getBundle("config");
    private static String URL;
    private static String USER;
    private static String PASSWORD;

    private static Connection connection = null;

    private Database() { }

    public static Connection getConnection() throws SQLException {
        if (connection == null) {
            createConnection();
        }
        return connection;
    }

    private static void createConnection() throws SQLException {
        URL = resourceBundle.getString("DATABASE_CONNECTION_STRING");
        USER = resourceBundle.getString("DATABASE_CONNECTION_USERNAME");
        PASSWORD = resourceBundle.getString("DATABASE_CONNECTION_PASSWORD");
        connection = DriverManager.getConnection(URL,USER,PASSWORD);
    }

    public static void closeConnection() throws SQLException {
        connection.close();
        connection = null;
    }

}
