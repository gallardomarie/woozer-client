package dao;

import entity.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao extends AbstractJpaDao<User> {

    public UserDao() {
        setClazz(User.class);
    }

}
