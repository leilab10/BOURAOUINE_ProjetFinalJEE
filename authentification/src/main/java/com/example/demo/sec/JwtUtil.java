package com.example.demo.sec;


public class JwtUtil {
    public static final String SECRET="mySecret1234";
    public static final String HEADER_PREFIX="Bearer ";
    public static final String AUTH_HEADER="Authorization";
    public static final long ACCESS_TOKEN_TIMEOUT=1*60*1000;
    public static final long REFRESH_TOKEN_TIMEOUT=10*60*1000;

}
