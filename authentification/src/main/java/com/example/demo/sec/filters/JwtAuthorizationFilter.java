package com.example.demo.sec.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.sec.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthorizationFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getServletPath().equals("/refreshToken") ||
                request.getServletPath().equals("/login")){
            filterChain.doFilter(request,response);
        }
        else {
            String authToken=request.getHeader(JwtUtil.AUTH_HEADER);
            if(authToken!=null && authToken.startsWith(JwtUtil.HEADER_PREFIX)){
                try {
                    String jwtToken = authToken.substring(JwtUtil.HEADER_PREFIX.length());
                    Algorithm algorithm = Algorithm.HMAC256(JwtUtil.SECRET);
                    JWTVerifier jwtVerifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = jwtVerifier.verify(jwtToken);
                    String username = decodedJWT.getSubject();
                    List<String> roles = decodedJWT.getClaim("roles").asList(String.class);
                    Collection<GrantedAuthority> authorities=new ArrayList<>();
                    roles.forEach(r -> {
                        authorities.add(new SimpleGrantedAuthority(r));
                    });
                    // Collection<GrantedAuthority> authorities=roles.stream().map(r -> new SimpleGrantedAuthority(r)).collect(Collectors.toList())
                    UsernamePasswordAuthenticationToken authenticationToken= new
                            UsernamePasswordAuthenticationToken(username,null,authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request,response);
                }
                catch (Exception e){
                    throw new RuntimeException(e.getMessage());
                }
            }
            else{
                filterChain.doFilter(request,response);
            }
        }

    }
}

