package channel.transaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import channel.transaction.model.PutUserRequest;
import channel.transaction.model.StandardResponse;
import channel.transaction.service.CustomerDataService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*")
public class CustomerDataController {
  @Autowired
  private CustomerDataService customerDataService;

  @PutMapping(
    path = "/api/users/data",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<StandardResponse<String>> putRequestUser (@RequestBody PutUserRequest requestBody, HttpServletRequest requestHeader) {
    Object customerId = requestHeader.getAttribute("UserId");
    customerDataService.putCustomerById(requestBody, customerId);
    return new ResponseEntity<StandardResponse<String>>(StandardResponse.<String>builder().data("Customer " + requestBody.getIdentityId() + " has already been edited").build(), HttpStatus.OK);
  }
}
