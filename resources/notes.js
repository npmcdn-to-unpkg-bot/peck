var Note = require('../models/note.js'),
	User = require('../models/user.js'),
	Comment = require('../models/comment.js'),
    auth = require('./auth');

module.exports = function(app) {

	// get all notes
	app.get('/api/notes', auth.ensureAuthenticated, function(req, res) {
		User.findById(req.userId).exec(function(err, user) {
			// use mongoose to get all posts in the database
			User.find(function(err, notes) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(notes); // return all notes in JSON format
			});
		});
	});

	app.get('/api/notes/:note_id', auth.ensureAuthenticated, function (req,res) {
	        User.findById(req.userId).exec(function (err, user) {
	            Note.findById(req.params.note_id)
	            	.populate({
	            		path: 'comments', 
	            		populate: {
	            			path:'userId', 
	            			model: 'User'
	            		}
	            	}) 
	            	.populate('userId')
	            	    .exec(function(err, note) {
	            	        if (err) { return res.status(404).send(err); }
	            	        res.send(note);
	            	       
	            	    });
	            	});

	});

	app.put('/api/notes/:note_id', auth.ensureAuthenticated, function(req,res){ 
            console.log('putroute', req.body);
            console.log('noteId', req.params.note_id);
            Note.findOneAndUpdate({ _id: req.params.note_id}, req.body , function (err, note) {
                // console.log("editRoute", note);
                if (err) { return res.send(err); }
                // console.log('backend', note);
                res.send(note);
            });
        });

	app.post('/api/notes', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var note = new Note(req.body);
			note.save(function(err, note) {
				user.notes.unshift(note._id);
				user.save();
				res.send(note);				
			});
		});
	});

	app.delete('/api/notes/:note_id', function(req, res) {
		Note.findByIdAndRemove({
			_id : req.params.note_id
		 }, function(err, note) {
			if (err)
				res.send(err);

			// Delete Note in User
			User.findOneAndUpdate(
				{ notes: req.params.note_id},
				{ "$pull": {"notes": req.params.note_id}},
				// { "new": true},
				function (err, note){
					if(err) {
						res.send(err);
					} else {
						console.log("OBjectID", note);
						Comment.remove({ note: req.params.note_id},
							function(err, comment){
								if(err){
									console.log(err);
									return res.send(err);
								}
							console.log('comment delete', comment);
							});
						res.status(200).send('Find user and deleted');
					}
					
				});
			});
	});


};
