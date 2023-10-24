package com.cs.routeportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class RoutePortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoutePortalApplication.class, args);
	}

}
