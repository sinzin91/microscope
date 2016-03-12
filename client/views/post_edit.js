Template.postEdit.events({
	'submit form': function(e) {
		// suppress the default submit form action
		e.preventDefault();

		// get the current post ID from the Template's data context
		var currentPostId = this._id;

		// get the new form field values from the page and store them 
		// in postProperties object
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		// pass postProperties object to Collection.update() Method
		// use callback that throws error or sends user to post page 
		// if update is successful
		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if (error) {
				// display the error to the user
				alert(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});