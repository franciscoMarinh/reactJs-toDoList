const jwt = require('jwt-simple')

module.exports = app =>{
    
    const cfg = app.config.development
    const users = app.models.users
    
    app.post('/token', (req,res)=>{

        if(req.body.email && req.body.password){

            const email = req.body.email
            const password = req.body.password
            users.findOne({where: {email}})
                .then(user=>{
                    if(users.isPassword(user.password, password)){
                        
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.encode(payload, cfg.secretOrKey)
                        });

                    }else{
                        
                        res.sendStatus(401)
                    }
                })
                .catch(e=> res.sendStatus(401))
        }else{
            res.sendStatus(401)
        }
    });
}