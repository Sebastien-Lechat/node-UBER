const express = require('express');
const Auth = require('../middleware/auth');
const router = express.Router();

const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});



router.post('/direction'/*, Auth.AuthentificationUser*/, async(req, res) => {
    try {
        const {origin, destination, waypoints} = req.body;
        if (! origin || !destination) res.status(400).send({success: false, message: 'Invalid body'});

        if (waypoints && waypoints.length > 0) {
            // Création d'un tableau contenant tous les waypoints et le point d'arrivé
            let allDestination = []
    
            for (let i = 0; i < waypoints.length; i++) {
                allDestination.push(waypoints[i].location);
            }
        }

        client.snapToRoads({
            key: '',
        })



    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
