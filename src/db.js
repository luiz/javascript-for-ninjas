function DB(url, testing) {
  this.url = url;
  
  $.ajax({
    type: 'PUT',
    url: this.url,
    async: false
  });

  this.reset = function() {
    $.ajax({
      type: 'DELETE',
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
      data: task,
      dataType: 'json',
    });
    return true;
  };

  this.getAllTasks = function(callback) {
    $.ajax({
      type: 'GET',
      url: this.url + '/tasks/_all_docs',
      success: callback
    });
  };

  this.addUser = function(user) {
    return true;
  }

  this.hasUser = function() {
    return true;
  };
}
