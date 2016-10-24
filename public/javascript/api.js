$(document).ready(function () {
	//Display the form to submit based on the first selection chosen.
	$("#action").on('change', function () {
		if ($(this).val() === 'add-artist') {
			$('#add-artist-form').show();
			$('#edit-artist-form').hide();
			$('#delete-artist-form').hide();
		} else if ($(this).val() === 'edit-artist') {
			$('#edit-artist-form').show();
			$('#add-artist-form').hide();
			$('#delete-artist-form').hide();
		} else if ($(this).val() === 'delete-artist') {
			$('#delete-artist-form').show();
			$('#add-artist-form').hide();
			$('#edit-artist-form').hide();
		} else {
			$('#add-artist-form').hide();
			$('#edit-artist-form').hide();
			$('#delete-artist-form').hide();
		}
	});

	//Change the editForm entries to default 
	$("#select-artist").on('change', function () {
		$('#data-edit').show();
		$('#edit-last-name').val();
	});

	//AJAX submit for add-artist
	// Get the form.
	var addForm = $('#add-artist');
	var editForm = $('#edit-artist');
	var deleteForm = $('#delete-artist');
	// Get the messages div.
	var formMessages = $('#form-messages');



	$(addForm).submit(function (event) {
		event.preventDefault();

		var formData = $(addForm).serialize();

		$.ajax({
				type: 'POST',
				url: '/admin/verified',
				data: formData
			})
			.done(function (response) {
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				$(formMessages).text(response);
				//Clear the form
				$('#first-name, #last-name, #tag, #style').val('');
				return;
			})
			.fail(function (data) {
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('An error has occurred. Artist was not added to database.');
				}
			});
	});
	//edit form function
	$(editForm).submit(function (event) {
		event.preventDefault();

		$.ajax({
				type: 'POST',
				url: '/admin/verified/edit',

				data: {
					firstName: firstName
				}
			})
			.done(function (response) {
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				$(formMessages).text(response);
				//Clear the form
				$('#first-name, #last-name, #tag, #style').val('');
				return;
			})
			.fail(function (data) {
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('An error has occurred. Artist was not edited.');
				}
			});
	});
	//delete form function
	$(deleteForm).submit(function (event) {
//		event.preventDefault();
		var artistSlug = '';
		$('#d-select-artist').on('change',function(){
			artistSlug = $(this).val();
		})
		
		var formData = $(deleteForm).serialize();

		$.ajax({
				type: 'post',
				url: '/admin/verified/remove',
				data: {
					slug: artistSlug
				}
			})
			.done(function (response) {
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				$(formMessages).text(response);
				return;
			})
			.fail(function (data) {
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('An error has occurred. Artist was not removed from database.');
				}
			});
	});
});
