import * as express from 'express';
import Photo from '../models/photo';

let router = express.Router();

// GET all photos
router.get('/', (req, res) => {
  Photo.find().then((photos)=> {
      res.json(photos);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

// Get a single photo by id
router.get('/:id', (req, res) => {
  Photo.findById(req.params['id']).then((photo) => {
    res.json(photo);
  });
});

// Create new photo
router.post('/', (req, res) => {
  let photo = new Photo();
  photo.name = req.body.name;
  photo.description = req.body.description;
  photo.imageURL = req.body.imageURL;

  // save new photo
  photo.save().then((newPhoto) => {
    res.json(newPhoto);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// Update existing photo
router.post('/:id', (req, res) => {
  let photoId = req.params.id;

  Photo.findById(photoId).then((photo) => {
    photo.name = req.body.name;
    photo.description = req.body.description;
    photo.imageURL = req.body.imageURL;

    // save updated photo
    photo.save().then((updatedPhoto) => {
      res.json(updatedPhoto);
    }).catch((err) => {
      res.status(400).json(err);
    });

  }).catch(() => {
    res.sendStatus(404);
  });

});


// Delete photo
router.delete('/:id', (req, res) => {
  let photoId = req.params.id;
  Photo.remove({_id:photoId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;
