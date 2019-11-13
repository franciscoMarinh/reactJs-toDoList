module.exports = app =>{
    
    if(process.env.NODE_ENV != "test"){
        app.listen(4000, ()=>{

            console.log('Servidor do Tmanager Rodando');

        });
    }
}