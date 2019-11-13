let users = app.models.users

describe("Route: Register", ()=>{
    beforeEach(done => {

        users.destroy({ where:{} })
            .then(() => done())
    })
    describe("POST /register", ()=>{
        describe("status 200", ()=>{
            it("Create a new user", done=>{
                request.post('/register')
                    .send({
                        name: "francisco Marinho",
                        password: "1234569789",
                        email: "franc1sc1566@gmail.com",
                    })
                    .expect(200)
                    .end((err,res)=>{

                        done(err)

                    })
            })
        })
    })


})