package channel.transaction.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import channel.transaction.entity.Customer;
import channel.transaction.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerDetails implements UserDetailsService {
  @Autowired
  private CustomerRepository customerRepository;

  public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
    Customer customer = customerRepository.findById(id)
      .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    return org.springframework.security.core.userdetails.User
      .withUsername(id)
      .password(customer.getPassword())
      .accountExpired(false)
      .accountLocked(false)
      .credentialsExpired(false)
      .disabled(false)
      .build();
  }
}
