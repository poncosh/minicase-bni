package channel.transaction.security;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtTokenFilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
  private JwtTokenProvider jwtTokenProvider;

  @Override
  public void configure(HttpSecurity http) throws Exception {
    JwtTokenFilter customFilter = new JwtTokenFilter(jwtTokenProvider);
    http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
  }

}
