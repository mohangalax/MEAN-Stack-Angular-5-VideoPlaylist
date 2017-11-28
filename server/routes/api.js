const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://admin:password@ds119406.mlab.com:19406/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, { useMongoClient: true }, function(err){
    if(err) {
        console.error('Error! '+err);
    }
});

router.get('/videos', function(req, res) {
    Video.find({}).exec(function(err, videos) {
        if(err) {
            console.log('Error while fetching videos.');
        } else {
            res.json(videos);
        }
    });
});

router.get('/videos/:id', function(req, res) {
    Video.findById(req.params.id).exec(function(err, video) {
        if(err) {
            console.log('Error while fetching single video.');
        } else {
            res.json(video);
        }
    });
});

router.post('/videos', function(req, res) {
    let newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    
    newVideo.save(function(err, insertedVideo) {
        if(err) {
            console.log('Error while inserting a video.');
        } else {
            res.json(insertedVideo);
        }
    });
});

router.put('/videos/:id', function(req, res) {
    Video.findByIdAndUpdate(req.params.id, 
        {
            $set: {title: req.body.title, url: req.body.url, description: req.body.description}
        },
        {
            new: true
        },
        function(err, updatedVideo) {
            if(err) {
                console.log('Error while updating a video.');
            } else {
                res.json(updatedVideo);
            }
        }
    )
});

router.delete('/videos/:id', function(req, res) {
    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
            if(err) {
                console.log('Error while deleting a video.');
            } else {
                res.json(deletedVideo);
            }
        }
    )
});

module.exports = router;