module.exports = app => {
    const db = app.models
    return{
      findAll: async (req,res) => {
        try {
          let result = await db.tasks.findAll({where: {userId: req.user.id}})
          res.json(result)
        } catch (error) {
          res.json(error)
        }
      },
      create: async (req,res) => {
        req.body.userId = req.user.id
        try {
          let result = await db.tasks.create(req.body)
          res.json(result)
        } catch (error) {
          res.sendStatus(404)
        }
      },
      findOne: async (req,res) => {
        try {
          let result = await db.tasks.findOne({ where: { id: req.params.id, userId: req.user.id } })
          if(result){
            res.json(result)
          }else{
            res.sendStatus(404)
          }
        } catch (error) {
          res.status(412).json({msg: error.message})
        }
      },
      delete: async (req,res) => {
        try {
          await db.tasks.destroy({where: { id: req.params.id,userId: req.user.id } })
          res.sendStatus(204)
        } catch (error) {
          res.status(412).json({msg: error.message})
        }
      },
      update: async (req,res) => {
        try {
          await db.tasks.update(req.body, {where: {id: req.params.id,userId: req.user.id} })
          res.sendStatus(204)
        } catch (error) {
          res.status(412).json({msg: error.message})
        }     
      },
    }

}