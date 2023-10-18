package channel.transaction.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "customer_transactions")
public class CustomerTransaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonIgnore
  private long id;

  @ManyToOne
  @JoinColumn(
    name = "customer_id",
    updatable = false,
    insertable = false
  )
  @JsonIgnore
  private Customer customer;

  @Column(name = "customer_id")
  private long customerId;

  private String name;

  private long amount;

  private long tariff;

  @Column(name = "created_at")
  private LocalDate createdAt;
}
