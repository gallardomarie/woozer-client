package service.impl;

import dao.UserDao;
import entity.User;
import exception.EmailAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public User findById(long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public void create(User user) {
        User testIfMailExists = userDao.findByEmail(user.getEmail());
        if(testIfMailExists != null) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }
        userDao.save(user);
    }
}
