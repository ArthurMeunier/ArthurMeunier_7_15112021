const db = require('../models');
const Likes = db.likes;

// LIKE POST
exports.likePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.userId;

    // On cherche si l'utilisateur a déjà liké ce post
    Likes.findOne({
        where: { postId: postId, userId: userId }
    })
    .then(like => {
        // Si l'utilisateur a déjà liké ce post
        if (like) {
            // On supprime le like de la database
            Likes.destroy({
                where: { userId: userId, postId: postId }
            })
            .then(() => res.status(200).json({message: "Like supprimé!"}))
            .catch((error) => res.status(400).json({error}))
        } 
        // Si l'utilisateur n'a pas encore liké ce post
        else {
            // On enregistre le like dans la database
            Likes.create({
                userId: userId,
                postId: postId,
            })
            .then(() => res.status(201).json({message: "Like ajouté!"}))
            .catch((error) => res.status(400).json({error}))
        }
    })
    .catch((error) => res.status(500).json({error}));
}

// GET ONE LIKE
exports.getOneLike = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.userId;
    Likes.findOne({
        where: {userId: userId, postId: postId}
    })
    .then(like => {
        res.status(200).json(like)
    })
    .catch(error => res.status(404).json({error}))
}

// GET ALL LIKES
exports.getAllLikes = (req, res, next) => {
    Likes.findAll({
        where: {postId: req.params.id},
    })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(404).json({error}))
}