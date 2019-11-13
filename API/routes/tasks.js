module.exports = app => {


    app.route('/tasks')
        .all(app.auth.authenticate())
        .get(app.controller.tasks.findAll)
        .post(app.controller.tasks.create);
    
    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        .get(app.controller.tasks.findOne)
        .delete(app.controller.tasks.delete)
        .put(app.controller.tasks.update)
        
 
}
    