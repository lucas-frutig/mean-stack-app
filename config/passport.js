var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');
module.exports = function(){
	var Usuario = mongoose.model('Usuario');
	
	passport.use(new GitHubStrategy({
		clientID: 'b3155efec1e43450d391',
		clientSecret: '0e55ead031c83429f3e04e3e82eb191de290c23c',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		
		Usuario.findOrCreate(
			{ "login" : profile.username}, 
			{ "nome" : profile.username},  
			function(erro, usuario) {
				if(erro) {
					return done(erro);
				} 
				return done(null, usuario);
			}
		);
	}));
	passport.serializeUser(function(usuario,done){
		done(null, usuario._id);
	});
	passport.deserializeUser(function(id, done) {
	  Usuario.findById(id).exec()
	  .then(function(usuario) {
	  	done(null, usuario);	
	  });
	});
};