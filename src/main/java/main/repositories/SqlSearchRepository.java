package main.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Administrator on 2017-09-04.
 */
@Component
public class SqlSearchRepository {

    @Autowired
    private DataSource dataSource;
/*
    private User rsUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setFirstName(rs.getString("firstName"));
        user.setLastName(rs.getString("lastName"));
        user.setEmail(rs.getString("email"));
        user.setUserName(rs.getString("userName"));
        user.setPassWord(rs.getString("passWord"));
        user.setUserID(rs.getInt("userID"));
        return user;
    }
    //todo
    //make anrop to the database
    public User getUser(String username) {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username = ?")) {
            ps.setString(1, username);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next())
                    return rsUser(rs);
            }
        } catch (SQLException e) {

        }

    }*/

    public String getUser(String username) throws SQLException {
        try(Connection conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username = ?")){
            ps.setString(1, username);
            try(ResultSet rs = ps.executeQuery()){
                if(rs.next()){
                    return rs.getString("username");
                }
            }
        }
        return null;

    }
}
