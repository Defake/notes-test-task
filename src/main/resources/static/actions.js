function getNoteTitle($note) {
    var $noteTitle = $note.find('.note-title');
    return ($noteTitle.val() || '').trim();
}

function getNoteContent($note) {
    var $noteContent = $note.find('.note-content');
    return ($noteContent.val() || '').trim();
}

function getNoteDataTitle($note) {
    var savedTitle = $note.data('title');
    if (savedTitle === undefined) 
        return '';
    else
        return String(savedTitle);
}

function getNoteDataContent($note) {
    var savedContent = $note.data('content');
    if (savedContent === undefined) 
        return '';
    else
        return String(savedContent);
}

function isNoteEmpty($note) {
    var title = getNoteTitle($note);
    var content = getNoteContent($note);

    return (title == '' && content == '')
}

function isNoteUnsaved($note) {
    if ($note.length == 0)
        return false;
    
    var savedTitle = getNoteDataTitle($note);
    var savedContent = getNoteDataContent($note);
    var currentTitle = getNoteTitle($note);
    var currentContent = getNoteContent($note);

    return savedTitle !== currentTitle || savedContent !== currentContent;
}

function showNotEmptyNoteTitle($note) {
    if (getNoteTitle($note) == '') {
        $note
            .find('.note-title')
            .addClass('js-empty-title')
            .val(getNoteContent($note));
    }
}

function revealEmptyNoteTitle($note) {
    var $emptyNoteTitle = $note.find('.note-title.js-empty-title');
    if ($emptyNoteTitle.length > 0) {
        $emptyNoteTitle.removeClass('js-empty-title');
        $emptyNoteTitle.val('');
    }
}

function showNote($note) {
    revealEmptyNoteTitle($note);
    $note.addClass('active');
}

function hideNote($note) {
    if (isNoteEmpty($note)) {
        $note.remove();
        return;
    }
        
    $note.removeClass('active');
    $note.find('.note-alert').remove();
    showNotEmptyNoteTitle($note);
}

function switchNoteToLoadingState($note) {
    $note.find('input, textarea').attr('readonly', true);
    $note.find('.save-btn').attr('disabled', true);
    $note.find('.spinner').show();
    $note.find('.delete-btn').hide();
}

function switchNoteToInteractableState($note) {
    $note.find('input, textarea').attr('readonly', false);
    $note.find('.save-btn').attr('disabled', false);
    $note.find('.spinner').hide();
    $note.find('.delete-btn').show();
}

function createNewNoteBlock() {
    var $note = $("#note-template form.note").clone();
    $note.appendTo(".notes-list");
    $note.css('display', 'block');
    return $note;
}

function addNoteToList(id, title, content) {
    var $note = createNewNoteBlock();

    $note.find('input[name=id]').val(id);
    $note.find('.note-title').val(title);
    $note.find('.note-content').val(content);

    $note.data('title', title);
    $note.data('content', content);

    showNotEmptyNoteTitle($note);
}

function getSearchQuery() {
    return $('.search-group').find('input').val();
}

function searchNotes() {
    var query = getSearchQuery();
    
    $('.notes-list').empty();
    $('.add-btn').hide();
    $('.spinner.big').show();
    $('.search-btn').attr('disabled', true);
    ajaxSearchRequest(query, function(notesArray) {
        $('.add-btn').show();
        $('.spinner.big').hide();
        $('.search-btn').attr('disabled', false);
        for (var i = 0; i < notesArray.length; i++) {
            var noteData = notesArray[i];
            addNoteToList(noteData["id"], noteData["title"], noteData["content"]);
        }
    });
}

function removeNoteIfNotMatchesSearch($note) {
    var query = getSearchQuery();
    if (!getNoteTitle($note).includes(query) && !getNoteContent($note).includes(query)) {
        $note.remove();
    }
}

function restoreNoteFromData($note) {
    var savedTitle = getNoteDataTitle($note);
    var savedContent = getNoteDataContent($note);

    $note.find('.note-title').val(savedTitle);
    $note.find('.note-content').val(savedContent);
}

function saveNoteData($note) {
    $note.data('title', getNoteTitle($note));
    $note.data('content', getNoteContent($note));
}

function saveNote($note) {
    saveNoteData($note);
    var id = $note.find('input[name=id]').val();

    if (id != '') {
        ajaxUpdateNoteRequest(id, $note, function() {
            switchNoteToInteractableState($note);
            removeNoteIfNotMatchesSearch($note);
        });
    } else {
        ajaxCreateNoteRequest($note, function(id) {
            $note.find('input[name=id]').val(id);
            switchNoteToInteractableState($note);
            removeNoteIfNotMatchesSearch($note);
        });
    }

    switchNoteToLoadingState($note);
}

function deleteNote($note) {
    var id = $note.find('input[name=id]').val();
    
    if (id == '') {
        $note.remove();
        return;
    }

    ajaxDeleteNoteRequest(id, function() { 
        $note.remove();
    });
    switchNoteToLoadingState($note);
}

function showAlert($note, text) {
    $note.find('.note-alert').remove();

    var $alert = $('.note-alert').clone();
    $alert.appendTo($note).css('display', 'block');
    $alert.fadeIn('fast');
    $alert.html(text);

    setTimeout(function() {
        $alert.fadeOut('slow', function() {
            $(this).remove();
        });
    }, 2500);
}

function showPleaseSaveAlert($note) {
    showAlert($note, 'Please save or cancel the note first!');
    $([document.documentElement, document.body]).animate({
        scrollTop: $note.offset().top
    }, 500);
    $note.find('.note-title').focus();
}
