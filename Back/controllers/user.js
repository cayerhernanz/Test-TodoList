//Controlleurs pour les fonctions d'user signup, login
const bcrypt = require('bcrypt');
const jsonWT = require('jsonwebtoken');
const tokenKey = process.env.TOKEN_SECRET;
const User = require('../models/user');

//Signin
exports.signIn = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            nickname: req.body.nickname,
            email: req.body.email,
            password: hash,
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée.'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
} 

//Login
exports.logIn = (req, res, next) => {
    User.findOne({nickname: req.body.nickname})
    .then(user => {
        if (user === null){
            res.status(401).json({message: 'identifiant/mot de passe incorrects'});
        }
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    res.status(401).json({message: 'identifian/mot de passe incorrects'});
                }
                else{
                    res.status(200).json({
                        userId: user._id,
                        token: jsonWT.sign(
                            {userId: user._id},
                            tokenKey,
                            {expiresIn: '3h'}
                        )
                    });
                }
            })
            .catch(error => {res.status(500).json({error})})
        }
    })
    .catch(error => { res.status(500).json({error})});
}

//Recuperer la liste des utilisateurs

//Recuperer le profil d'un utilisateur
