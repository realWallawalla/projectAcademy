package main.repositories;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;

/**
 * Created by Administrator on 2017-09-06.
 */

@Component
public class SqlGetBarRepository {

    @Autowired
    private DataSource dataSource;

//    private Bar rsBar(ResultSet rs) throws SQLException {
//        return new Bar(
//                rs.getInt("Id"),
//                rs.getString("adress"),
//                rs.getString("postnr"),
//                rs.getInt("priceBeer"),
//                rs.getInt("priceCider"),
//                rs.getInt("priceWine")
//
//        );
//    }


//    public  List<Bar> listBar() {
//        try (Connection conn = dataSource.getConnection();
//             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Bars WHERE postnr = (?,?));
//             ps.setString(1, "11123");
//             ps.setString(2, "14123");
//             ResultSet rs = ps.executeQuery() {
//            List<Bar> bars = new ArrayList<>();
//            while (rs.next()) bars.add(rsBar(rs));
//            return bars;
//        } catch (SQLException e) {
//            throw new RepositoryException(e);
//        }
//    }


//    public List<Bar> getBars() throws SQLException {
//            List<Bar> bars = new ArrayList<>();
//            try (Connection conn = dataSource.getConnection();
//                 Statement stmt = conn.createStatement();
//                 ResultSet rs = stmt.executeQuery("SELECT * FROM Bars")) {
//                while(rs.next()) {
//                    bars.add(rsBar(rs));
//                }
//            }
//            return bars;
//        }
}