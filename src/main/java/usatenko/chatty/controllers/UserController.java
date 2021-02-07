package usatenko.chatty.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import usatenko.chatty.controllers.api.ControllerAPI;
import usatenko.chatty.storages.UserStorage;

import java.util.Set;

@RestController
@CrossOrigin
public class UserController {

    @GetMapping(path = ControllerAPI.USER_CONTROLLER_REGISTRATION)
    public ResponseEntity<Void> register(@PathVariable String userName) {
        System.out.println("handling register user request: " + userName);
        try {
            UserStorage.getInstance().setUser(userName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = ControllerAPI.USER_CONTROLLER_FETCH_ALL_USERS)
    public Set<String> fetchAll() {
        return UserStorage.getInstance().getUsers();
    }
}
