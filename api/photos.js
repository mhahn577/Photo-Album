"use strict";
var express = require("express");
var photo_1 = require("../models/photo");
var router = express.Router();
router.get('/', function (req, res) {
    photo_1.default.find().then(function (photos) {
        res.json(photos);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    photo_1.default.findById(req.params['id']).then(function (photo) {
        res.json(photo);
    });
});
router.post('/', function (req, res) {
    var photo = new photo_1.default();
    photo.name = req.body.name;
    photo.description = req.body.description;
    photo.imageURL = req.body.imageURL;
    photo.save().then(function (newPhoto) {
        res.json(newPhoto);
    }).catch(function (err) {
        res.status(400).json(err);
    });
});
router.post('/:id', function (req, res) {
    var photoId = req.params.id;
    photo_1.default.findById(photoId).then(function (photo) {
        photo.name = req.body.name;
        photo.description = req.body.description;
        photo.imageURL = req.body.imageURL;
        photo.save().then(function (updatedPhoto) {
            res.json(updatedPhoto);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    }).catch(function () {
        res.sendStatus(404);
    });
});
router.delete('/:id', function (req, res) {
    var photoId = req.params.id;
    photo_1.default.remove({ _id: photoId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
