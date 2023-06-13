package site.solbti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class SoLbtiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoLbtiApplication.class, args);
	}
}
