package channel.transaction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import channel.transaction.entity.Customer;
import channel.transaction.model.RegisterUserRequest;
import channel.transaction.repository.CustomerDataRepository;
import channel.transaction.repository.CustomerRepository;
import channel.transaction.repository.CustomerTransactionRepository;
import channel.transaction.security.BCrypt;
import jakarta.transaction.Transactional;

@Service
public class CustomerService {
  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private CustomerDataRepository customerDataRepository;

  @Autowired
  private CustomerTransactionRepository customerTransactionRepository;

  @Autowired
  private ValidationService validationService;

  @Transactional
  public void registerCustomer(RegisterUserRequest request) {
    validationService.validate(request);
    if (customerRepository.existsByEmail(request.getEmail())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is already exists!");
    }

    Customer customer = new Customer();
    customer.setName(request.getName());
    customer.setEmail(request.getEmail());
    customer.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
    customer.setBalance(0);

    customerRepository.save(customer);
  }

  public Customer getSelf(Object request) {
    return customerRepository.findById(request.toString())
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }
}
