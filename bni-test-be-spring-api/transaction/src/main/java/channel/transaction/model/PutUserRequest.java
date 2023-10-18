package channel.transaction.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PutUserRequest {
  @NotBlank
  @Size(max = 16)
  private String identityId;

  @NotBlank
  @Size(max = 255)
  private String address;

  @NotBlank
  private String phoneNumber;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @NotBlank
  @Past
  private LocalDate dateOfBirth;
}
