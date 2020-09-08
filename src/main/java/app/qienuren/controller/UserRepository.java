//package app.qienuren.controller;
//
//import app.qienuren.model.Persoon;
//import app.qienuren.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository <Persoon, Integer> {
//    Optional<Persoon> findByEmail(String userName);
//}
//
////import app.qienuren.model.User;
////import org.springframework.data.domain.Sort;
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.data.jpa.repository.Query;
////
////import java.util.List;
////
////public interface UserRepository extends JpaRepository<User, Integer> {
////
//    @Query(value = "SELECT u FROM User u")
//    List<User> findAllUsers(Sort sort);
//
//    User findByUsername(String name);
//}
