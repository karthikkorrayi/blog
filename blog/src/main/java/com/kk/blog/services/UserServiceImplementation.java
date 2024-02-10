package com.kk.blog.services;

import com.kk.blog.configuration.JwtProvider;
import com.kk.blog.exception.UserException;
import com.kk.blog.model.User;
import com.kk.blog.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {


    private UserRepository userRepository;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;


    public UserServiceImplementation(
            UserRepository userRepository,
            JwtProvider jwtProvider,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;


    }










    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email=jwtProvider.getEmailFromJwtToken(jwt);

        System.out.println("email"+email);

        Optional<User> user=userRepository.findByEmail(email);

        if(user.isEmpty()) {
            throw new UserException("user not exist with email "+email);
        }
        System.out.println("email user "+user.get().getEmail());
        return user.get();
    }






}
