package channel.transaction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import channel.transaction.entity.Customer;
import channel.transaction.model.LoginUserRequest;
import channel.transaction.repository.CustomerRepository;
import channel.transaction.security.BCrypt;
import channel.transaction.security.JwtTokenProvider;

@Service
public class AuthService {
  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private ValidationService validationService;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  public String login(LoginUserRequest request) {
    validationService.validate(request);
    if (!customerRepository.existsByEmail(request.getEmail())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email or password is invalid!");
    }

    Customer customer = customerRepository.findByEmail(request.getEmail());

    if (BCrypt.checkpw(request.getPassword(), customer.getPassword())) {
      return jwtTokenProvider.createToken(customer);
    } else {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email or password is invalid!");
    }
  }
}
