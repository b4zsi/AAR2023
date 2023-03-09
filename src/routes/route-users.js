const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/',userController.get_fo_oldal);

router.get('/menu', userController.get_menu);

router.post('/menu/:id', userController.post_menu);

router.get('/kosar', userController.get_kosar);

router.post('/kosar/:id', userController.post_kosar);

router.route('/fizetes')
    .get(userController.get_fizetes)
    .post(userController.post_fizetes);

router.route('/register')
    .get(userController.get_register)
    .post(userController.post_register);

router.route('/login')
    .get(userController.get_login)
    .post(userController.post_login);

router.get('/logout', userController.get_logout);

router.get('/profil', userController.get_profil);

router.route('/updateProfil/:id')
    .get(userController.get_update_profil)
    .post(userController.post_update_profil);

router.post('/deleteProfil/:id', userController.post_delete_profil);

router.get('/ertekeles', userController.get_ertekeles);

router.post('/addErtekeles', userController.post_add_ertekeles);

router.post('/editErtekeles', userController.post_edit_ertekeles);

router.post('/delErtekeles', userController.post_del_ertekeles);

module.exports = router;