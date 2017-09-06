package controller;

import domain.Bar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repositories.SqlGetBarRepository;

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

        @Autowired
        SqlGetBarRepository sqlGetBarRepository;

        @GetMapping("/GET")
        @ResponseBody
        public List<Bar> getInView() {
            return sqlGetBarRepository.listBar();
        }

}

