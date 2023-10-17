package channel.transaction.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.filter.OncePerRequestFilter;

import channel.transaction.exception.CustomException;

// We should use OncePerRequestFilter since we are doing a database call, there is no point in doing this more than once
public class JwtTokenFilter extends OncePerRequestFilter {
  private JwtTokenProvider jwtTokenProvider;

  public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
    String token = jwtTokenProvider.resolveToken(httpServletRequest);
    try {
      if (token != null && jwtTokenProvider.validateToken(token)) {
        Authentication auth = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String id = jwtTokenProvider.getId(token);
        httpServletRequest.setAttribute("UserId", id);
      }
    } catch (CustomException ex) {
      //this is very important, since it guarantees the user is not authenticated at all
      SecurityContextHolder.clearContext();
      httpServletResponse.sendError(HttpStatus.FORBIDDEN.value(), "Invalid token!");
      return;
    }

    filterChain.doFilter(httpServletRequest, httpServletResponse);
  }

}