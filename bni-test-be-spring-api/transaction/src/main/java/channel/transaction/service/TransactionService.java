package channel.transaction.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import channel.transaction.entity.CustomerTransaction;
import channel.transaction.exception.CustomException;
import channel.transaction.entity.Customer;
import channel.transaction.model.NewTransaction;
import channel.transaction.model.TopUpBalance;
import channel.transaction.repository.CustomerRepository;
import channel.transaction.repository.CustomerTransactionRepository;
import jakarta.transaction.Transactional;

@Service
public class TransactionService {
  @Autowired
  private CustomerTransactionRepository customerTransactionRepository;

  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private ValidationService validationService;

  @Transactional
  public void newTransactionWithinBank (NewTransaction request, Object customerId) {
    validationService.validate(request);
    LocalDate now = LocalDate.now();
    long transactionAmount = -request.getAmount();

    Customer customer = customerRepository.findById(customerId.toString())
      .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    if (customer.getBalance() + transactionAmount < 0) {
      throw new CustomException("Transaction cannot be procceed because of the insufficient amount", HttpStatus.NOT_ACCEPTABLE);
    }

    CustomerTransaction customerTransaction = new CustomerTransaction();
    customerTransaction.setName(request.getName());
    customerTransaction.setAmount(transactionAmount);
    customerTransaction.setTariff(0);
    customerTransaction.setCreatedAt(now);
    customerTransaction.setCustomerId(Long.parseLong(customerId.toString()));

    customer.setBalance(customer.getBalance() + transactionAmount);

    customerRepository.save(customer);
    customerTransactionRepository.save(customerTransaction);
  }

  @Transactional
  public void newTransactionOutsideBank (NewTransaction request, Object customerId) {
    validationService.validate(request);
    LocalDate now = LocalDate.now();
    long transactionAmount = -request.getAmount();

    Customer customer = customerRepository.findById(customerId.toString())
      .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    if (customer.getBalance() + transactionAmount < 0) {
      throw new CustomException("Transaction cannot be procceed because of the insufficient amount", HttpStatus.NOT_ACCEPTABLE);
    }

    CustomerTransaction customerTransaction = new CustomerTransaction();
    customerTransaction.setName(request.getName());
    customerTransaction.setAmount(transactionAmount);
    customerTransaction.setTariff(7500);
    customerTransaction.setCreatedAt(now);
    customerTransaction.setCustomerId(Long.parseLong(customerId.toString()));

    customer.setBalance(customer.getBalance() + transactionAmount - 7500);

    customerRepository.save(customer);
    customerTransactionRepository.save(customerTransaction);
  }

  public void topUpTransaction (TopUpBalance request, Object customerId) {
    if (request.getAmount() < 0) {
      throw new CustomException("Transaction cannot be procceed because the amount is negative", HttpStatus.NOT_ACCEPTABLE);
    }

    Customer customer = customerRepository.findById(customerId.toString())
      .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    customer.setBalance(customer.getBalance() + request.getAmount());
    
    customerRepository.save(customer);
  }

  public CustomerTransaction getTransactionById (String id) {
    return customerTransactionRepository.findById(id)
      .orElseThrow(() -> new UsernameNotFoundException("Transaction not found!"));
  }

  public List<CustomerTransaction> getInquiryTransaction (Object customerId) {
    LocalDate ninetyDaysAgo = LocalDate.now().minusDays(90);
    return customerTransactionRepository.findWithDateAfter(Long.parseLong(customerId.toString()), ninetyDaysAgo);
  }

  public List<CustomerTransaction> getPaymentTransactions (Object customerId) {
    return customerTransactionRepository.findPaymentTransactions(Long.parseLong(customerId.toString()));
  }
}
