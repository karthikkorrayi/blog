package com.kk.blog.services;


import com.kk.blog.exception.BlogException;
import com.kk.blog.model.Blog;
import com.kk.blog.model.User;
import com.kk.blog.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImplementation implements BlogService{

    @Autowired
    public BlogRepository blogRepository;

    @Autowired
    public UserService userService;

    @Override
    public Blog createBlog(Blog blog, User user) {

        Blog newBlog=new Blog();
        newBlog.setDescription(blog.getDescription());
        newBlog.setImage(blog.getImage());
        newBlog.setTitle(blog.getTitle());
        newBlog.setUser(user);
        newBlog.setCreatedAt(LocalDateTime.now());

        return blogRepository.save(newBlog);
    }


    @Override
    public Blog findBlogById(Long id) throws BlogException {
        Optional<Blog> opt=blogRepository.findById(id);
        if(opt.isPresent()) {
            return opt.get();
        }
        throw new BlogException("blog not found with id "+id);
    }

    @Override
    public void deleteBlog(Long id) throws BlogException {
        Blog blog=findBlogById(id);

        blogRepository.delete(blog);

    }

    @Override
    public Blog updateBlog(Blog blog, Long id) throws BlogException {
        Blog oldBlog = findBlogById(id);

        if(blog.getDescription()!=null) {
            oldBlog.setDescription(blog.getDescription());
        }
        if(blog.getImage()!=null) {
            oldBlog.setImage(blog.getImage());
        }
        if(blog.getTitle()!=null) {
            oldBlog.setTitle(blog.getTitle());
        }

        return blogRepository.save(oldBlog);
    }

    @Override
    public List<Blog> findAllBlog() {
        // TODO Auto-generated method stub
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }


    @Override
    public Blog likeBlog(Long blogId, User user) throws BlogException {
        Blog blog=findBlogById(blogId);
        if(blog.getLikes()==null) {
            blog.setLikes(new ArrayList<>());
        }
        if(blog.getLikes().contains(user.getId())) {
            blog.getLikes().remove(user.getId());
        }
        else {
            blog.getLikes().add(user.getId());
        }

        return blogRepository.save(blog);
    }

}
