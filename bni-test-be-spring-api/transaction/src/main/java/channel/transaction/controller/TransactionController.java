package channel.transaction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import channel.transaction.entity.CustomerTransaction;
import channel.transaction.model.NewTransaction;
import channel.transaction.model.StandardResponse;
import channel.transaction.model.TopUpBalance;
import channel.transaction.service.TransactionService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
public class TransactionController {
  @Autowired
  private TransactionService transactionService;

  @PostMapping(
    path = "/api/users/transaction/bni",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE  
  )
  public ResponseEntity<StandardResponse<String>> newTransactionWithinBank(@RequestBody NewTransaction requestBody, HttpServletRequest requestHeader) {
    Object customer = requestHeader.getAttribute("UserId");
    transactionService.newTransactionWithinBank(requestBody, customer);
    return new ResponseEntity<StandardResponse<String>>(StandardResponse.<String>builder().data("Transaction " + requestBody.getName() + " has already been created").build(), HttpStatus.CREATED);
  }

  @PostMapping(
    path = "/api/users/transaction/others",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE  
  )
  public ResponseEntity<StandardResponse<String>> newTransactionOutsideBank(@RequestBody NewTransaction requestBody, HttpServletRequest requestHeader) {
    Object customer = requestHeader.getAttribute("UserId");
    transactionService.newTransactionOutsideBank(requestBody, customer);
    return new ResponseEntity<StandardResponse<String>>(StandardResponse.<String>builder().data("Transaction " + requestBody.getName() + " has already been created").build(), HttpStatus.CREATED);
  }

  @PostMapping(
    path = "/api/users/transaction/topup",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<StandardResponse<String>> topUpRequest(@RequestBody TopUpBalance requestBody, HttpServletRequest requestHeader) {
    Object customer = requestHeader.getAttribute("UserId");
    transactionService.topUpTransaction(requestBody, customer);
    return new ResponseEntity<StandardResponse<String>>(StandardResponse.<String>builder().data("Top up with amount " + requestBody.getAmount() + " has already been done").build(), HttpStatus.OK);
  }

  @GetMapping(
    path = "/api/users/transaction/inquiry",
    consumes = MediaType.ALL_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public StandardResponse<List<CustomerTransaction>> getInquiryById(HttpServletRequest request) {
    Object customer = request.getAttribute("UserId");
    List<CustomerTransaction> customerTransactions = transactionService.getInquiryTransaction(customer);
    return new StandardResponse<>(customerTransactions, null);
  }

  @GetMapping(
    path = "/api/users/transaction/payment",
    consumes = MediaType.ALL_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public StandardResponse<List<CustomerTransaction>> getPaymentById(HttpServletRequest request) {
    Object customer = request.getAttribute("UserId");
    List<CustomerTransaction> customerTransactions = transactionService.getPaymentTransactions(customer);
    return new StandardResponse<>(customerTransactions, null);
  }

  @GetMapping(
    path = "/api/users/transaction/{id}",
    consumes = MediaType.ALL_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public StandardResponse<CustomerTransaction> getTransactionById(@PathVariable String id) {
    CustomerTransaction customerTransaction = transactionService.getTransactionById(id);
    return new StandardResponse<>(customerTransaction, null); 
  }
}
