package com.defake.naunotes.controllers;

import com.defake.naunotes.dal.Note;
import com.defake.naunotes.dal.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotesController {

    @Autowired
    private NotesRepository notesRepository;

    @GetMapping(value = {"/notes"})
    public List<Note> searchNotes(@RequestParam(value="query", defaultValue="") String query) {
        return query.isEmpty()
                ? notesRepository.findAllByOrderByIdAsc()
                : notesRepository.getBySearchQuery(query);
    }

    @PutMapping(value = {"/notes"})
    @ResponseStatus(value = HttpStatus.CREATED)
    public Long addNote(
            @RequestParam(value="title") String title,
            @RequestParam(value="content") String content) {

        if (title.isEmpty() && content.isEmpty())
            return null;

        Note newNote = notesRepository.save(new Note(title, content));
        return newNote.getId();
    }

    @PostMapping(value = {"/notes/{id}"})
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void editNote(
            @PathVariable("id") Long id,
            @RequestParam(value="title") String title,
            @RequestParam(value="content") String content) {

        if (title.isEmpty() && content.isEmpty())
            return;

        notesRepository.updateById(id, title, content);
    }

    @DeleteMapping(value = {"/notes/{id}"})
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable("id") Long id) {
        notesRepository.deleteById(id);
    }
}
