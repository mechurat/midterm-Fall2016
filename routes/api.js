$(function() {
    // Get the form.
    var form = $('#add-artist');

    // Get the messages div.
    var formMessages = $('#form-messages');
	$(form).submit(function(event){
		event.preventDefault();
		
		var formData = $(form).serialize();
		
		$.ajax({
			type: 'POST'
			data:{
				name: name,
				tag: tag,
				artStyle: artStyle
			}
		})
		.done(function(response){
			$(formMessages).removeClass('error');
			$(formMessages).removeClass('success');
			
			$(formMessages).text(response);
			
			$('#name, #tag, #artStyle').val('');
		})
		.fail(function(data){
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			
			if(data.responseText !== ''){
				$(formMessages).text(data.responseText);
			}else{
				$(formMessages).text('An error has occurred. Artist was not added to database.');
			}
		});
	});
});

$(function() {
    // Get the form.
    var form = $('#edit-artist');

    // Get the messages div.
    var formMessages = $('#form-messages');
	$(form).submit(function(event){
		event.preventDefault();
	});
});

$(function() {
    // Get the form.
    var form = $('#delete-artist');

    // Get the messages div.
    var formMessages = $('#form-messages');
	$(form).submit(function(event){
		event.preventDefault();
	});
});