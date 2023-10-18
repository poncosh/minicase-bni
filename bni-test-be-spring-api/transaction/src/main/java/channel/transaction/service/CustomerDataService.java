package channel.transaction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import channel.transaction.entity.CustomerData;
import channel.transaction.model.PutUserRequest;
import channel.transaction.repository.CustomerDataRepository;

@Service
public class CustomerDataService {
  @Autowired
  private CustomerDataRepository customerDataRepository;

  public void putCustomerById(PutUserRequest request, Object customerId) {
    String customerString = customerId.toString();
    CustomerData customerData = customerDataRepository.findByCustomerId(Long.parseLong(customerString));

    if (customerData != null) {
      customerData.setIdentityId(request.getIdentityId());
      customerData.setAddress(request.getAddress());
      customerData.setPhoneNumber(request.getPhoneNumber());
      customerData.setDateOfBirth(request.getDateOfBirth());

      customerDataRepository.save(customerData);
      return;
    }

    CustomerData newData = new CustomerData();
    newData.setCustomerId(Long.parseLong(customerString));
    newData.setIdentityId(request.getIdentityId());
    newData.setAddress(request.getAddress());
    newData.setPhoneNumber(request.getPhoneNumber());
    newData.setDateOfBirth(request.getDateOfBirth());

    customerDataRepository.save(newData);
  }
}
