package com.kk.blog.controller;


import com.kk.blog.exception.BlogException;
import com.kk.blog.exception.UserException;
import com.kk.blog.model.Blog;
import com.kk.blog.model.User;
import com.kk.blog.responses.ApiResponse;
import com.kk.blog.services.BlogService;
import com.kk.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Blog> createBlog(
            @RequestBody Blog blog, @RequestHeader("Authorization") String jwt) throws UserException {
        // Assuming you have a way to fetch the user by userId from your service
        User user = userService.findUserProfileByJwt(jwt);
        Blog newblog = blogService.createBlog(blog, user);
        return new ResponseEntity<>(newblog, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable("id") Long id) throws BlogException {

        Blog blog = blogService.findBlogById(id);
        return new ResponseEntity<>(blog, HttpStatus.OK);

    }
    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlog() throws BlogException {

        List<Blog> blog = blogService.findAllBlog();
        return new ResponseEntity<>(blog, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBlog(@PathVariable("id") Long id) throws BlogException {

        blogService.deleteBlog(id);
        ApiResponse res=new ApiResponse("blog deleted",true);
        return new ResponseEntity<>(res, HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable("id") Long id, @RequestBody Blog blog) throws BlogException {

        Blog updatedBlog = blogService.updateBlog(blog,id);
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);

    }

    @PutMapping("/{id}/like")
    public ResponseEntity<Blog> likeBlog(
            @RequestHeader("Authorization") String jwt,
            @PathVariable("id") Long id
    ) throws BlogException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Blog updatedBlog = blogService.likeBlog(id, user);
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);

    }

}
