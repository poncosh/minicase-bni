package channel.transaction.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;

  @Column(unique = true)
  private String email;

  @JsonIgnore
  private String password;

  private long balance;

  @OneToMany(
    mappedBy = "customer",
    fetch = FetchType.EAGER,
    cascade = CascadeType.PERSIST,
    orphanRemoval = true
  )
  private List<CustomerTransaction> transactions;

  @OneToOne(
    mappedBy = "customer",
    fetch = FetchType.EAGER,
    cascade = CascadeType.PERSIST
  )
  private CustomerData customerData;
}
