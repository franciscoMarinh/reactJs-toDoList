module.exports = app =>{

    app.route('/')
    .get((req,res)=>{
        res.status(200).json({status: "Team Manager"}) //Lembrar Remover essa rota daqui
    })

}