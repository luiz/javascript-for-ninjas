function DB(url, testing) {
  this.url = url;
  
  this.reset = function() {
    $.ajax({
      type: 'DELETE',
      url: this.url,
      async: false
    }); 
    $.ajax({
      type: 'PUT',
      url: this.url,
      async: false
    });
    return true;
  };

  if (testing) {
    this.reset();
  }

  this.addTask = function(task) {
    $.ajax({
      type: 'PUT',
      url: this.url + '/' + task.id,
      data: $.toJSON(task),
      dataType: 'json',
    });
    return true;
  };

  this.getAllTasks = function(callback) {
    $.ajax({
      type: 'GET',
      url: this.url + '/_all_docs',
      success: function(json) {
        callback($.evalJSON(json));
      }
    });
  };

  this.addUser = function(user) {
    $.ajax({
      type: 'PUT',
      url: this.url + '/' + user.login,
      data: $.toJSON(user),
      dataType: 'json',
    });
    return true;
  }

  this.hasUser = function(user) {
    var found = false;
    $.ajax({
      type: 'GET',
      url: this.url + '/' + user.login,
      success: function(json) {
        var foundUser = $.evalJSON(json);
        found = (foundUser.password == user.password);
      },
      async: false
    });
    return found;
  };
}
