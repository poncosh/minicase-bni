package channel.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import channel.transaction.entity.CustomerData;

@Repository
public interface CustomerDataRepository extends JpaRepository<CustomerData, String> {
  
}
