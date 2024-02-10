package com.kk.blog.services;

import com.kk.blog.exception.UserException;
import com.kk.blog.model.User;

public interface UserService {

    public User findUserProfileByJwt(String jwt) throws UserException;

}
