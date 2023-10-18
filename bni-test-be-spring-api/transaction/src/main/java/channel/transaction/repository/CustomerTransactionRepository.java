package channel.transaction.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import channel.transaction.entity.CustomerTransaction;

@Repository
public interface CustomerTransactionRepository extends JpaRepository<CustomerTransaction, String> {
  @Query("select t from CustomerTransaction t where t.customerId = ?1 and t.createdAt >= ?2")
  List<CustomerTransaction> findWithDateAfter(long customerId, LocalDate ninetyDaysAgo);

  @Query("select t from CustomerTransaction t where t.customerId = ?1 and t.amount < 0")
  List<CustomerTransaction> findPaymentTransactions(long customerId);
}
