package site.solbti.security;
import lombok.extern.java.Log;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Log
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    //컴포넌트 : class레벨에서 Bean 자동생성
    @Bean //특정 객체를 직접 생성한다.
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Spring Security에서 제공하는 비밀번호 암호화 객체
    }
    @Override // WebSecurity를 통해 HTTP 요청에 대한 웹 기반 보안을 구성
    public void configure(WebSecurity web) throws Exception {
        // 파일 기준은 resources/static 디렉터리의 하위 파일 목록은 인증 무시 ( = 항상통과 )
        web.ignoring().antMatchers("/css/**", "/js/**", "/images/**", "/lib/**");
    }
    protected void configure(HttpSecurity http) throws Exception {
        log.info("!!!!!!security config..........");
        http.csrf().disable();
        http.authorizeRequests() // HttpServletRequest에 따라 접근(access)을 제한
                .antMatchers("/","/auth/**","/checktoken","/**").permitAll() // 로그인없이                                                                                             // 허용
                .antMatchers("/admin/**").hasRole("ADMIN") // /admin으로 시작하는 경로는 ADMIN롤을 가진 사용자만 접근 가능(자동으로 ROLE_가 삽입)
                .antMatchers("/manager/**").hasRole("MANAGER")
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated().and(); //나머지요청은 인증된 사용자만 접근가능(반드시 로그인을 해야한다.),
        http.exceptionHandling().accessDeniedPage("/accessDenied");
    }
}