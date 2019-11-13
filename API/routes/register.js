module.exports = app =>{
    
    app.post("/register",app.controller.users.create);

}