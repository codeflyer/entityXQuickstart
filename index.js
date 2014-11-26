var MongoClient = require('mongodb');
console.log('This is an entityx sample project');

var EntityX = require('entityx');
EntityX.setApplicationRoot(__dirname);

// the parameter is the relative path of the module
EntityX.addModule('modules/books');

MongoClient.connect('mongodb://127.0.0.1:27017/BookLibrary', function(err, db) {
  console.log("Check for MongoConnection");
  console.log(new Date());
  console.log('mongodb://127.0.0.1:27017/BookLibrary');
  if (err) {
    console.err("Mongo connection error");
    console.err(err);
    return;
  }
  EntityX.ConnectionManager.addConnection(db);

  var Factory = require('entityx').Factory;
  var newBook =
      Factory.getEntity('Books/Book');
  newBook.setTitle('Harry Potter and the Philosopher\'s Stone');
  newBook.setAuthor('J. K. Rowling');
  newBook.setPublisher('Bloomsbury');
  newBook.insert().then(
      function(result) {
        console.log('New created book Id: ' + newBook.getId());

        console.log('Create e new instance of the book');
        var existentBook =
            Factory.getEntity('Books/Book', newBook.getId());

        return existentBook.load();
      }
  ).then(function(instancedBook) {
        console.log('Loaded book title: ' + instancedBook.getTitle());
      }
  ).catch(function(err) {
        console.log(err);
      }
  ).finally(
      function() {
        setTimeout(function() {
          process.exit(0);
        }, 1000);
      }
  );
});