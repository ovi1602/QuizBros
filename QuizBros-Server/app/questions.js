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
   let questionTitle = req.params.title;
   let query = 'UPDATE Questions SET numarvoturi1 = numarvoturi1 + 1 WHERE title = "' + questionTitle + '"';
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
  let questionTitle = req.params.title;
  let query = 'UPDATE Questions SET numarvoturi2 = numarvoturi2 + 1 WHERE title = "' + questionTitle + '"';
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
