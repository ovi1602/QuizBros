var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

 passport.serializeUser(function(user, done){
  done(null, user.id);
 });

 passport.deserializeUser(function(id, done){
  connection.query("SELECT * FROM users WHERE id = ? ", [id],
   function(err, rows){
    done(err, rows[0]);
   });
 });

 

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM users WHERE username = ? ", 
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: username,
      password: bcrypt.hashSync(password, null, null)
     };

     var insertQuery = "INSERT INTO users (username, password) values (?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
      function(err, rows){
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    console.log(username);
   connection.query("SELECT * FROM users WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));

    return done(null, rows[0]);
   });
  })
 );

 passport.use(
    'local-postquestion',
    new LocalStrategy({
        titleField: 'title',
        answer1Field: 'answer1',
        answer2Field: 'answer2'
    },
    function(req, title, answer1, answer2, done){
     
        var newQuestionMysql = {
            title: title,
            answer1: answer1,
            answer2: answer2
           };

           console.log("aici");
      
           var insertQuery = "INSERT INTO questions (title, answer1, answer2) values (?, ?, ?)";
      
           connection.query(insertQuery, [newQuestionMysql.title, newQuestionMysql.answer1, newQuestionMysql.answer2],
            function(err, rows){
                if(err) {
                    
                    return done(null, false, req.flash('questionsMessage', 'Something went wrong'));
                    
                }
             newQuestionMysql.id = rows.insertId;
      
             return done(null, newQuestionMysql);
        });
      }
     )
    );


};