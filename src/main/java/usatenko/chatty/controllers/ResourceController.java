package usatenko.chatty.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import usatenko.chatty.controllers.api.ControllerAPI;

@Controller
public class ResourceController {

    @GetMapping(value = ControllerAPI.RESOURCE_CONTROLLER_GET_MAIN, produces = MediaType.TEXT_HTML_VALUE)
    public String test(){
        return "main-page";
    }
}
