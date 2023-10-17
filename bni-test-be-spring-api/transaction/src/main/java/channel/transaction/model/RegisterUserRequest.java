package channel.transaction.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterUserRequest {
  @NotBlank
  @Size(max = 255)
  private String name;

  @NotBlank
  @Size(max = 50)
  private String email;

  @NotBlank
  @Size(max = 50)
  private String password;
}
