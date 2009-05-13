var TEST_DB_URL = 'http://localhost/db/ninja_test';
var TESTE;
function createTestDB() { 
  $.ajax({
    type: 'PUT',
    url: TEST_DB_URL,
    success: fillTestDB
  });
}

function fillTestDB() {
  var test_db = [
  {
    name: "/tasks",
    items: [
      {
        id: "task1",
        where: "Dojo",
        what: "Train ninja skills",
        until: new Date(),
        duration: "60"
      },
      {
        id: "task2",
        where: "Black market",
        what: "Buy shurikens",
        until: new Date(),
        comment: "Need at least 10"
      },
      {
        id: "task3",
        where: "Dojo",
        what: "Train ninja skills",
        until: new Date(),
        duration: "60"
      },
      {
        id: "task4",
        where: "Home",
        what: "Sharpen my sword",
        until: new Date(),
        duration: "5"
      }
    ]
  },
  {
    name: "/users",
    items: [
      {
        id: "user1",
        name: "Secret",
        login: "secret",
        password: "secret"
      }
    ]
  }];
  TESTE = test_db;
  for (test_item_class in test_db) {
    $.ajax({
      type: 'PUT',
      url: TEST_DB_URL + test_item_class.name,
      async: false
    });
    for (test_item in test_item_class.items) {
      alert(test_item);
      $.ajax({
        type: 'PUT',
        url: TEST_DB_URL + test_item_class.name + '/' + test_item.id,
        data: test_item,
        dataType: 'json',
        async: false
      });
    }
    alert(test_item_class.name);
    return test_item_class;
  }
}

function clearTestDB() {
  $.ajax({
    type: 'DELETE',
    url: TEST_DB_URL,
    async: false
  });
}

$(document).ready(function() {
    module("DB");

    var db = new DB(TEST_DB_URL);
    test("retrieve all tasks from db", function() {
      createTestDB();
      equals(db.getAllTasks().length, 4, "should retrieve 4 tasks");
      clearTestDB();
    });

    test("finds existing user from db", function() {
      createTestDB();
      var user = {
        "name": "Secret",
        "password": "secret",
        "login": "secret"
      };
      ok(db.hasUser(user), "should have this user");
      clearTestDB();
    });

    test("doesnt find unregistered user from db", function() {
      createTestDB();
      var user = {
        "name": "White ninja",
        "password": "notsecret",
        "login": "white_ninja"
      };
      ok(!db.hasUser(user), "should not have this user");
      clearTestDB();
    });
});

