package channel.transaction.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import channel.transaction.model.StandardResponse;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ErrorException {
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<StandardResponse<String>> constraintViolationException(ConstraintViolationException exception) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(StandardResponse.<String>builder().errors(exception.getMessage()).build());
  }

  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<StandardResponse<String>> apiException(ResponseStatusException exception) {
    return ResponseEntity.status(exception.getStatusCode()).body(StandardResponse.<String>builder().errors(exception.getReason()).build());
  }

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<StandardResponse<String>> customException(CustomException exception) {
    return ResponseEntity.status(exception.getHttpStatus()).body(StandardResponse.<String>builder().errors(exception.getMessage()).build());
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<StandardResponse<String>> notFoundException(UsernameNotFoundException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(StandardResponse.<String>builder().errors(exception.getMessage()).build());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<StandardResponse<String>> handleException(Exception exception) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(StandardResponse.<String>builder().errors(exception.getMessage()).build());
  }
}
