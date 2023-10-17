package channel.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import channel.transaction.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
  Customer findByEmail(String email) throws ResponseStatusException;

  public boolean existsByEmail(String email); 
}
