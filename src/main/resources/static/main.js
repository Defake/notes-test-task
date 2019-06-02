$(document).on('focus', '.note-title, .note-content', function(e) {
    var $note = $(e.currentTarget).closest('.note');
    if ($note.hasClass('active'))
        return;

    var $openedNote = $('.note.active');
    if (isNoteUnsaved($openedNote)) {
        showPleaseSaveAlert($openedNote);
        return;
    }
    
    hideNote($openedNote);
    showNote($note);
});

$(document).on('click', '.save-btn', function(e) {
    var $note = $(e.currentTarget).closest('form.note');

    if (isNoteEmpty($note)) {
        showAlert($note, 'You can not save an empty note!');
        return;
    }

    saveNote($note);
    hideNote($note);
});

$(document).on('click', '.cancel-btn', function(e) {
    var $note = $(e.currentTarget).closest('form.note');
    restoreNoteFromData($note);
    hideNote($note);
});

$(document).on('click', '.delete-btn', function(e) {
    var $note = $(e.currentTarget).closest('form.note');
    deleteNote($note);
});

$(document).on('click', '.add-btn', function(e) {
    var $openedNote = $('.note.active');
    if (isNoteUnsaved($openedNote)) {
        showPleaseSaveAlert($openedNote);
        return;
    }
    hideNote($openedNote);

    var $note = createNewNoteBlock();
    $note.find('.note-title').focus();
});

$(document).on('click', '.search-btn', function(e) {
    var $openedNote = $('.note.active');
    if (isNoteUnsaved($openedNote)) {
        showPleaseSaveAlert($openedNote);
        return;
    }

    searchNotes();
});

$(document).on('submit', 'form', function() {
    return false;
});
