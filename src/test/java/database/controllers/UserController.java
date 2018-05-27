package database.controllers;

import database.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserController {

    public boolean userExistsInDatabase(String userEmail) throws SQLException {
        Connection con = Database.getConnection();
        String sql = "SELECT * from users where mail = ?";
        PreparedStatement preparedStatement = con.prepareStatement(sql);
        preparedStatement.setString(1,userEmail);
        ResultSet resultSet =preparedStatement.executeQuery();
        int resultCount = 0;

        while (resultSet.next())
            resultCount++;

        return resultCount!=0;
    }

    public void deleteUserFromDatabase(String userEmail) throws SQLException {
        Connection con = Database.getConnection();
        String sql = "DELETE from users where mail = ?";
        PreparedStatement preparedStatement = con.prepareStatement(sql);
        preparedStatement.setString(1,userEmail);
        preparedStatement.execute();
    }

    public String getUserPassword(String userEmail) throws SQLException {
        Connection con = Database.getConnection();
        String sql = "SELECT password from users where mail = ?";
        PreparedStatement preparedStatement = con.prepareStatement(sql);
        preparedStatement.setString(1,userEmail);
        ResultSet resultSet =preparedStatement.executeQuery();

        resultSet.next();

        return resultSet.getString(1);
    }

    public String getUserFullName(String userEmail) throws SQLException {
        Connection con = Database.getConnection();
        String sql = "SELECT fullName from users where mail = ?";
        PreparedStatement preparedStatement = con.prepareStatement(sql);
        preparedStatement.setString(1,userEmail);
        ResultSet resultSet =preparedStatement.executeQuery();

        resultSet.next();

        return resultSet.getString(1);
    }

}
