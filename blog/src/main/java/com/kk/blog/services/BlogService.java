package com.kk.blog.services;

import com.kk.blog.exception.BlogException;
import com.kk.blog.model.Blog;
import com.kk.blog.model.User;

import java.util.List;

public interface BlogService {

    public Blog createBlog(Blog blog, User user);

    public Blog findBlogById(Long id) throws BlogException;

    public void deleteBlog(Long id) throws BlogException;

    public Blog updateBlog(Blog blog,Long id) throws BlogException;

    public List<Blog> findAllBlog();

    public Blog likeBlog(Long blogId,User user) throws BlogException;


}