package service;

import entity.User;

public interface UserService {

    User findById(long id);

    User findByEmail(String email);

    void create(User user);

}
