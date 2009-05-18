var TEST_DB_URL = 'http://localhost/db/ninja_test';

var test_tasks = [
  {
    id: "task1",
    type: "task",
    where: "Dojo",
    what: "Train ninja skills",
    until: new Date(),
    duration: "60"
  },
  {
    id: "task2",
    type: "task",
    where: "Black market",
    what: "Buy shurikens",
    until: new Date(),
    comment: "Need at least 10"
  },
  {
    id: "task3",
    type: "task",
    where: "Dojo",
    what: "Train ninja skills",
    until: new Date(),
    duration: "60"
  },
  {
    id: "task4",
    type: "task",
    where: "Home",
    what: "Sharpen my sword",
    until: new Date(),
    duration: "5"
  }
];

var test_users = [
  {
    id: "user1",
    type: "user",
    name: "Secret",
    login: "secret",
    password: "secret"
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
        "name": "Secret",
        "password": "secret",
        "login": "secret"
      };
      ok(db.addUser(user), "should add the test user");
    });

    test("finds existing user from db", function() {
      expect(2);
      var db = new DB(TEST_DB_URL, true);
      var user = {
        "name": "Secret",
        "password": "secret",
        "login": "secret"
      };
      ok(db.addUser(user), "should add the test user");
      ok(db.hasUser(user), "should have this user");
    });

    test("doesnt find unregistered user from db", function() {
      expect(1);
      var db = new DB(TEST_DB_URL, true);
      var user = {
        "name": "White ninja",
        "password": "notsecret",
        "login": "white_ninja"
      };
      ok(!db.hasUser(user), "should not have this user");
    });
});

