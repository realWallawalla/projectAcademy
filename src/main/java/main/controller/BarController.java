package main.controller;

import main.domain.Bar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017-09-06.
 */

@RestController
public class BarController {

        @Autowired
        DataSource dataSource;


        private Bar rsBar(ResultSet rs) throws SQLException {
                return new Bar(
                        rs.getInt("Id"),
                        rs.getString("adress"),
                        rs.getString("postnr"),
                        rs.getInt("priceBeer"),
                        rs.getInt("priceCider"),
                        rs.getInt("priceWine"));
        }


        @GetMapping("/GET")
        @ResponseBody
        public List<Bar> getBars() {
                List<Bar> bars = new ArrayList<>();
                try (Connection conn = dataSource.getConnection();
                     Statement stmt = conn.createStatement();
                     ResultSet rs = stmt.executeQuery("SELECT * FROM Bars")) {
                        while(rs.next()) {
                                bars.add(rsBar(rs));
                        }
                } catch (SQLException e){
                        e.getErrorCode();
                        System.out.println(e.getMessage());
                }

                return bars;
        }

}

