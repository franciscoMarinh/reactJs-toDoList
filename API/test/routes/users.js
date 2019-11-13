let users = app.models.users
const jwt = require('jwt-simple');
const cfg = app.config.development;

let token;
let fakeUser;

describe("Route: Users", ()=>{
    beforeEach(done => {

        users.destroy({ where:{} })
            .then(() => {
                users.create({
                    name: 'Francisco',
                    email: "Francisco@gmail.com",
                    password: "12345"
                })
                    .then(user=>{

                        fakeUser = user
                        token = jwt.encode({id: user.id}, cfg.secretOrKey)
                        done()
                    })
            })
    })
    describe("GET /user", ()=>{
        describe("status 200", ()=>{
            it("Return user", done=>{
                request.get('/user')
                    .set("Authorization", `bearer ${token} `)
                    .expect(200)
                    .end((err,res)=>{

                        expect(res.body.email).to.eql(fakeUser.email)
                        done(err)
                    })
            })
        })
    })
    describe("PUT /user", ()=>{
        describe('status 204', () => {
            it("updates a task", done => {
                request.put(`/user`)
                .set("Authorization", `bearer ${token} `)
                .send({
                    name:"Francisco do bar",
                    age: 30,
                    office: "No",
                    password: '123456789109050132581'
                })
                .expect(204)
                .end((err,res)=>{
                    done(err)

                });
            })
        });
    }) 
    describe('DELETE /user', ()=>{
        describe('status 204', () => {
            it("delete a user", done => {
                request.delete(`/user`)
                .set("Authorization", `bearer ${token} `)
                .expect(204)
                .end((err,res)=>{
                    done(err)
                });
            })
        });
    });
})