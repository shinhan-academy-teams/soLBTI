package site.solbti.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.context.annotation.Bean;

public class MongoConfig {

    private static final String URI = "";
    private static final String DATABASE = "";

    @Bean
    public MongoDatabase mongoDatabase(){
        MongoClient mongoClient = MongoClients.create(URI);
        MongoDatabase database = mongoClient.getDatabase(DATABASE);
        return  database;
    }
}
