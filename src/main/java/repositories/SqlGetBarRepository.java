package repositories;

import domain.Bar;
import main.repositories.BlogRepositoryException;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017-09-06.
 */

@Component
public class SqlGetBarRepository {

    @Autowired
    private DataSource dataSource;

    private Bar rsBar(ResultSet rs) throws SQLException {
        return new Bar(
                rs.getInt("Id"),
                rs.getString("adress"),
                rs.getString("postnr"),
                rs.getInt("priceBeer"),
                rs.getInt("priceCider"),
                rs.getInt("priceWine")

        );
    }


    public  List<Bar> listBar() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM Bars WHERE adress = 'Jan Stenbecks torg 15'")) {
            List<Bar> bars = new ArrayList<>();
            while (rs.next()) bars.add(rsBar(rs));
            return bars;
        } catch (SQLException e) {
            throw new RepositoryException(e);
        }
    }
}
