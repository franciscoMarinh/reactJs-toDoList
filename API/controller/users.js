module.exports = app =>{
  const db = app.models

  return {
    find: async (req,res) => {
      try{
      let user = await db.users.findOne({
        where: {id: req.user.id},
        attributes: ['id','name','email','office','age','createdAt'],
      })
        res.json(user)
      }catch(error){
        res.json(error)
      } 
    },
    create: async (req,res) => {
      try {
        let result = await db.users.create(req.body)
        res.json(result)
      } catch (error) {
        res.sendStatus(404)
      }
    },
    delete: async (req,res) => {
      try {
        await db.users.destroy({where: {id: req.user.id} })
        res.sendStatus(204)
      } catch (error) {
        res.status(412)
      }
    },
    update: async (req,res) => {
      try {
        await db.users.update(req.body, {where: {id: req.user.id},individualHooks: true})
        res.sendStatus(204)
      } catch (error) {
        res.status(412)
      }
    }
  }
}