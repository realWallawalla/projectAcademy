package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import repositories.SqlSearchRepository;

import java.sql.SQLException;

/**
 * Created by Administrator on 2017-09-04.
 */
@Controller
public class SearchController {
//why is this never used? ask senior can't find the issue here...
@Autowired
    private SqlSearchRepository searchRep;

    @GetMapping("/search")
    public ModelAndView search(){
        return new ModelAndView("Search");
    }

    @PostMapping("/searchresult")
    //todo
    //get users from database if there are any by getting the sql query from the repository
    public ModelAndView getUsersDisplayed(String member) throws SQLException {
        String memberdb = searchRep.getUser(member);
        return new ModelAndView("Search").addObject(memberdb);
    }




}
