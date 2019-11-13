let users = app.models.users;
let tasks = app.models.tasks;
const jwt = require('jwt-simple');
const cfg = app.config.development;

let token;
let fakeTask;

describe("Routes: Tasks", ()=>{
    beforeEach(done => {
        users.destroy({where: {}})
            .then(()=>{
                users.create({
                    name: 'Francisco ',
                    email: "Francisco@gmail.com",
                    password: "12345"
                })
                    .then((user)=> {
                        tasks.destroy({where: {}})
                            .then( ()=> tasks.bulkCreate([
                                {
                                    id: 1,
                                    title: 'work',
                                    userId: user.id,
                                },
                                {
                                    id: 2,
                                    title: "study",
                                    userId: user.id
                                }
                            ]))
                                .then( () => {
                                    
                                    tasks.findAll({})
                                        .then(tasks => {

                                            fakeTask = tasks[0]
                                            token = jwt.encode({id: user.id}, cfg.secretOrKey);
                                            done();
                                        })
                                    
                                })
                    });
                    
            })
    })
    describe('GET /tasks', () => {
        describe('status 200', () => {
            it("return list of tasks", done => {
                request.get('/tasks')
                    .set("Authorization", `bearer ${token} `)
                    .expect(200)
                    .end((err,res)=> {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql("work");
                        expect(res.body[1].title).to.eql("study");
                        done(err)
                    });
            })
        });
    })
    describe('POST /tasks', () => {
        describe('status 200', () => {
            it("creates a new task", done => {
                request.post('/tasks')
                .set("Authorization", `bearer ${token} `)
                .send({title:"run"})
                .expect(200)
                .end((err,res)=>{
                    expect(res.body.title).to.eql('run')
                    done(err)
                });
            })
        });
    })
    describe('GET /tasks/:id', () => {
        describe('status 200', () => {
            it("returns one task", done => {
                request.get(`/tasks/${fakeTask.id}`)
                .set("Authorization", `bearer ${token} `)
                .expect(200)
                .end((err,res)=>{
                    expect(res.body.title).to.eql(fakeTask.title);
                    expect(res.body.id).to.eql(fakeTask.id);
                    expect(res.body.userId).to.eql(fakeTask.userId);
                    done(err);

                })
            })
        });
        describe('status 404', () => {
            it("throws error when task not exist", done => {
                request.get('/tasks/0')
                .set("Authorization", `bearer ${token} `)
                .expect(404)
                .end((err,res)=>{
                    done(err)
                })
            })
        });
    })
    

    describe('PUT /tasks/:id', () => {
        describe('status 204', () => {
            it("updates a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                .set("Authorization", `bearer ${token} `)
                .send({
                    title: "travel",
                    status: "finish"
                })
                .expect(204)
                .end((err,res)=>{

                    done(err)

                });
            })
        });
        describe('status 412', () => {
            it("throws error cannot update a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                .set("Authorization", `bearer ${token} `)
                .send({
                    title: "travel",
                    status: "completed"
                })
                .expect(412)
                .end((err,res)=>{
                    done(err)
                });
            })
        });
    })
    describe('DELETE /tasks/:id', () => {
        describe('status 204', () => {
            it("removes a task", done => {
                request.delete(`/tasks/${fakeTask.id}`)
                .set("Authorization", `bearer ${token} `)
                .expect(204)
                .end((err,res)=>{

                    done(err)

                });
            })
        });
    })

})