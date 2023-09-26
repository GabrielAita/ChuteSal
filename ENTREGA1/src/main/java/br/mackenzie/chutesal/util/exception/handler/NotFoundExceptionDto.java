package br.mackenzie.chutesal.util.exception.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class NotFoundExceptionDto {

    private final int status;
    private HttpStatus error;
    private final String message;
}
