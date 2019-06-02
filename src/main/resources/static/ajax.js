function ajaxUpdateNoteRequest(id, $note, onSuccess) {
    $.ajax({
        url: '/notes/' + id, 
        type: 'POST',
        data: $note.serialize()
    }).done(onSuccess);
}

function ajaxCreateNoteRequest($note, onSuccess) {
    $.ajax({
        url: '/notes', 
        type: 'PUT',
        dataType: 'json',
        data: $note.serialize()
    }).done(function(id) {
        if (id != '') {
            onSuccess(id);
        }
    });
}

function ajaxSearchRequest(query, onSuccess) {
    $.ajax({
        url: '/notes',
        type: 'GET',
        dataType: 'html',
        data: {"query": query}
    }).done(function(result) {
        var notesArray = JSON.parse(result);
        onSuccess(notesArray);
    });
}

function ajaxDeleteNoteRequest(id, onSuccess) {
    $.ajax({
        url: '/notes/' + id, 
        type: 'DELETE'
    }).done(onSuccess);
}
