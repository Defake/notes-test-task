package com.defake.naunotes.controllers;

import com.defake.naunotes.dal.Note;
import com.defake.naunotes.dal.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class PageController {

    @Autowired
    private NotesRepository notesRepository;

    @GetMapping(value = {"/"})
    public String index(Model model) {
        List<Note> notes = notesRepository.findAllByOrderByIdAsc();
        model.addAttribute("notes", notes);

        return "index";
    }
}
