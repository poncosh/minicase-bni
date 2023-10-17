package channel.transaction.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
}
