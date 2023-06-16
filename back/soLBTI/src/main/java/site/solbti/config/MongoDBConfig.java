package site.solbti.config;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

// 몽고DB에 save 작업시 _class 필드를 저장하지 않기 위한 설정 파일
@Configuration
public class MongoDBConfig {
    @Bean
    public MappingMongoConverter setConvert(MongoDatabaseFactory factory, MongoMappingContext ctx, BeanFactory beanFactory){
        DbRefResolver resolver = new DefaultDbRefResolver(factory);
        MappingMongoConverter converter = new MappingMongoConverter(resolver,ctx);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return converter;
    }

}
