const express = require('express') 
const router = express.Router()
const usersSchema = require('../models/usuarios')
router.get('/editar/:id', async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await usersSchema.findById(userId)
      if (!user) {
          return res.status(404).send('Usuario no encontrado');
      }
      res.render('editar', { user }); 
  } catch (err) {
  console.log(err);
    res.status(500).send('Error al buscar el usuario');
  }
});
router.post('/editar/:id', async (req, res) => {
  try {
    const userId = req.params.id;
  const { name, email } = req.body; 
  const updatedUser = await usersSchema.findByIdAndUpdate(userId, { name, email }, { new: true });
  if (!updatedUser) {
    return res.status(404).send('Usuario no encontrado');
  }
    res.redirect('/'); 
  } 
  catch (err) {
    console.log(err);
        res.status(500).send('Error al actualizar el usuario');
        }
  });
  module.exports = router

  