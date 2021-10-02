const Clarifai = require('clarifai');

const app = new Clarifai.App({ 
    apiKey: '96bd3a36961a4c11a732261e7bddbd21'
   });
const handleApiCall = (req, res) => {
    if(!req.body.input){
        return res.status(401).json("missing")
    }
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input) 
    .then(data => {
        res.json(data);
    })
    .catch(err=> res.status(400).json("wrong"))
}

const handleImage = (req, res, db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err =>{
        res.status(400).json("unable to get entries")
    })
} 

module.exports={
    handleImage: handleImage,
    handleApiCall: handleApiCall
}