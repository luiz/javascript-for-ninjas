DB.Gears = function() {
  this.db = new GearsDB('ninja-gears');

  this.reset = function() {
    this.db.dropTable('user');
    this.db.dropTable('tasks');
    this.db.run('create table users (name varchar(255), password varchar(255), login varchar(255))');
    this.db.run('create table tasks (id varchar(255), type varchar(255), where_to_do varchar(255), what varchar(255), until varchar(255), duration varchar(255), comment varchar(255))');
    return true;
  };

  this.reset();

  this.addTask = function(task) {
    this.db.insertRow('tasks', task);
    return true;
  };

  this.getAllTasks = function(callback) {
    var tasks = [];
    this.db.selectAll('select * from tasks', null, function(task) {
        tasks.push(task);
    });
    callback({ rows: tasks,
      total_rows: tasks.length });
  };

  this.addUser = function(user) {
    this.db.insertRow('users', user);
    return true;
  };

  this.hasUser = function(user) {
    var found = this.db.selectOne('select * from users where login = ? and password = ?', [user.login, user.password]);
    return (found != null);
  };
};
