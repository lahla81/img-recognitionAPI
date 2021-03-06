const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '7c0724e244e44b8b8fac3805020db584'
   });

const handleApiCall = (req,res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('can not response'))
}

const handleImage = (req,res,db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImage : handleImage,
    handleApiCall: handleApiCall
}