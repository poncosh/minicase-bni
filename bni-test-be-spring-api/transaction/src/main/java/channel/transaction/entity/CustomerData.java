package channel.transaction.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customer_data")
public class CustomerData {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonIgnore
  private long id;

  @OneToOne
  @JoinColumn(
    name = "customer_id",
    updatable = false,
    insertable = false
  )
  @JsonIgnore
  private Customer customer;

  @Column(name = "customer_id")
  @JsonIgnore
  private long customerId;

  @Column(name = "identity_id", unique = true)
  private String identityId;

  private String address;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;
}
