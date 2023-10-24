package com.cs.routeportal.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExceptionResponse {
    private boolean result;
    private String exceptionMessage;
}
