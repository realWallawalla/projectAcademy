package main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@SpringBootApplication
public class DemoApplication {
	//here is the demoapplication used but why is it not used i SearchController Class?
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


	/*@GetMapping("/search")
	public ModelAndView search(){
		return new ModelAndView("main.Search");
	}*/









}
