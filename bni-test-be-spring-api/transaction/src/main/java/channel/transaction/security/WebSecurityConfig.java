package channel.transaction.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfig {
  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  private static final String[] WHITE_LIST_URL = {
    "/api/users/register",
    "/api/users/login",
    "/v2/api-docs",
    "/v3/api-docs",
    "/v3/api-docs/**",
    "/swagger-resources",
    "/swagger-resources/**",
    "/configuration/ui",
    "/configuration/security",
    "/swagger-ui/**",
    "/webjars/**",
    "/swagger-ui.html"
  };

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        .authorizeHttpRequests(req -> req
          .requestMatchers(WHITE_LIST_URL)
          .permitAll()
          .anyRequest()
          .authenticated()
        )
        .exceptionHandling()
        .accessDeniedPage("/api/users/about")
        .accessDeniedPage("/api/users/data")
        .accessDeniedPage("/api/users/transaction/**")
    ;

    http.apply(new JwtTokenFilterConfigurer(jwtTokenProvider));

    return http.build();
  }
}