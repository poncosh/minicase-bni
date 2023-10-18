package channel.transaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import channel.transaction.model.LoginUserRequest;
import channel.transaction.model.RegisterUserRequest;
import channel.transaction.model.StandardResponse;
import channel.transaction.model.TokenResponse;
import channel.transaction.model.UserResponse;
import channel.transaction.entity.Customer;
import channel.transaction.service.AuthService;
import channel.transaction.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
public class CustomerController {
  @Autowired
  private CustomerService customerService;

  @Autowired
  private AuthService authService;

  @PostMapping(
    path = "/api/users/register",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE  
  )
  public ResponseEntity<StandardResponse<String>> registerCustomer(@RequestBody RegisterUserRequest request) {
    customerService.registerCustomer(request);
    return new ResponseEntity<StandardResponse<String>>(StandardResponse.<String>builder().data("Customer " + request.getName() + " has already been created").build(), HttpStatus.CREATED);
  }

  @PostMapping(
    path = "/api/users/login",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public TokenResponse loginCustomer(@RequestBody LoginUserRequest request) {
    String token = authService.login(request);
    return new TokenResponse(token);
  }

  @GetMapping(
    path = "/api/users/about"
  )
  public UserResponse<Customer> getUser(HttpServletRequest request) {
    Object customer = request.getAttribute("UserId");
    Customer customerData = customerService.getSelf(customer);
    return new UserResponse<>("OK", customerData);
  }
}
