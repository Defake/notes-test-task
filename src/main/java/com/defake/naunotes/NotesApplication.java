package com.defake.naunotes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class NotesApplication {
	public static void main(String[] args) {
		SpringApplication.run(NotesApplication.class, args);
	}
}
