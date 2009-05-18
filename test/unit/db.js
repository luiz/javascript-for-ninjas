var TEST_DB_URL = 'http://localhost/db/ninja_test';

var test_tasks = [
  {
    id: "task1",
    type: "task",
    where: "Dojo",
    what: "Train ninja skills",
    until: "2009-05-22",
    duration: "60"
  },
  {
    id: "task2",
    type: "task",
    where: "Black market",
    what: "Buy shurikens",
    until: "2009-06-23",
    comment: "Need at least 10"
  },
  {
    id: "task3",
    type: "task",
    where: "Dojo",
    what: "Train ninja skills",
    until: "2009-05-29",
    duration: "60"
  },
  {
    id: "task4",
    type: "task",
    where: "Home",
    what: "Sharpen my sword",
    until: "2009-06-23",
    duration: "5"
  }
];

$(document).ready(function() {
    module("DB");

    test("reset the db", function() {
      expect(2);
      var db = new DB(TEST_DB_URL, true);
      ok(db.reset(), "should reset the database");
      db.getAllTasks(function(result) {
        start();
        equals(result.total_rows, 0, "should have no tasks after reseting");
      });
      stop(1000);
    });

    test("add a task to the db", function() {
      expect(2);
      var db = new DB(TEST_DB_URL, true);
      db.reset();
      ok(db.addTask({
        id: "test_task",
        type: "task",
        where: "here",
        what: "Test the application",
        duration: "forever"
      }), "should create this task");
      db.getAllTasks(function(result) {
        start();
        equals(result.total_rows, 1, "should have the added task");
      });
      stop(1000);
    });

    test("retrieve all tasks from db", function() {
      expect(5);
      var db = new DB(TEST_DB_URL, true);
      for (var i = 0; i < test_tasks.length; i++) {
        ok(db.addTask(test_tasks[i]), "should add test tasks");
      }
      db.getAllTasks(function(result) {
        start();
        equals(result.total_rows, 4, "should retrieve 4 tasks");
      });
      stop(1000);
    });

    test("insert a new user", function() {
      expect(1);
      var db = new DB(TEST_DB_URL, true);
      var user = {
        name: "Secret",
        password: "secret",
        login: "secret"
      };
      ok(db.addUser(user), "should add the test user");
    });

    test("finds existing user from db", function() {
      expect(2);
      var db = new DB(TEST_DB_URL, true);
      var user = {
        name: "Secret",
        password: "secret",
        login: "secret"
      };
      ok(db.addUser(user), "should add the test user");
      ok(db.hasUser(user), "should have this user");
    });

    test("doesnt find unregistered user from db", function() {
      expect(1);
      var db = new DB(TEST_DB_URL, true);
      var user = {
        name: "White ninja",
        password: "notsecret",
        login: "white_ninja"
      };
      ok(!db.hasUser(user), "should not have this user");
    });
});

