module.exports = {

 

 getQuestions: (req, res) => {
   let query = "SELECT title, answer1, answer2 FROM questions";
   var mysql = require('mysql');

   var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "quizbros"
   });

   con.query(query, (err, result) =>{
     if(err){
       res.redirect("/profile");
     }
     res.render('questions.ejs', {
       questions: result
     });
   });
 },

 vote1: (req, res) => {
   let questionId = req.params.id;
   let query = 'UPDATE questions SET numarvoturi1 = numarvoturi1 + 1 WHERE id = "' + questionId + '"';
   var mysql = require('mysql');

   var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "quizbros"
   });

   con.query(query, (err, result) => {
     if(err) return res.status(500).send(err);
   

   res.redirect('/questions');
  }
   )

 },
 vote2: (req, res) => {
  let questionId = req.params.id;
  let query = 'UPDATE questions SET numarvoturi2 = numarvoturi2 + 1 WHERE id = "' + questionId + '"';
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quizbros"
  });

  con.query(query, (err, result) => {
    if(err) return res.status(500).send(err);
  

  res.redirect('/questions');
 }
  )

},

delete1: (req, res) => {
  let questionId = req.params.id;
  let query = 'DELETE FROM questions WHERE id = "' + questionId + '"';
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quizbros"
  });

  con.query(query, (err, result) => {
    if(err) return res.status(500).send(err);
  

  res.redirect('/questions');
 }
  )

}
 
};
