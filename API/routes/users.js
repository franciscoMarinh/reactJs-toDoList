module.exports = app => {

app.route('/user')
    .all(app.auth.authenticate())
    .get(app.controller.users.find)
    .delete(app.controller.users.delete)
    .put(app.controller.users.update);

}
