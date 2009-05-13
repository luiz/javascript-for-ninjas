function DB(url) {
  this.url = url;
  this.getAllTasks = function() {
    var returnValue = undefined;
    $.ajax({
      type: 'GET',
      url: this.url + '/_all_docs',
      async: false,
      success: function(json) {
        alert(json);
        returnValue = [];
      }
    });
    return returnValue;
  };

  this.hasUser = function() {
  };
}
