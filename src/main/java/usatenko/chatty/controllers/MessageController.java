package usatenko.chatty.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import usatenko.chatty.controllers.api.ControllerAPI;
import usatenko.chatty.model.MessageModel;
import usatenko.chatty.storages.UserStorage;

@RestController
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping(value = ControllerAPI.MESSAGE_CONTROLLER_CHAT)
    public void sendMessage(@DestinationVariable String to, MessageModel message) {
        System.out.println("handling send message: " + message + " to: " + to);
        boolean isExists = UserStorage.getInstance().getUsers().contains(to);
        if (isExists) {
            simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
        }
    }
}
