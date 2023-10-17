package channel.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import channel.transaction.entity.CustomerTransaction;

@Repository
public interface CustomerTransactionRepository extends JpaRepository<CustomerTransaction, String> {
  
}
