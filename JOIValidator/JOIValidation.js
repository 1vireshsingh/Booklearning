'use strict';

const Joi = require('joi');
const controllername = require('../BookController/BookList');

const schema = Joi.string().min(2).max(15);
const headerschema = Joi.object().keys({
    //Content-Type: 'application/x-www-form-urlencoded',
      'content-type' : Joi.string().valid(['application/json']).required(),
      'x-api-key': Joi.string().valid(['123456']).required(),

});

const Validategetrequest = (req,res)=>{
    Joi.validate(req.query.name,schema,(err,value) => {
        if(err)
        res.status(422).json({
            status: 'error',
            message: err
        });
        else
        controllername.getAllDataAsPerTheName(req,res);
    })
}

const Validatepostrequest = (req,res)=>{
   // console.log(req.headers['content-type']);
  //  console.log(req.headers['x-api-key']);
    let headerobj ={
         'content-type':req.headers['content-type'],
        'x-api-key' : req.headers['x-api-key']
    };
    Joi.validate(headerobj,headerschema,(err,value) => {
        if(err)
        res.status(422).json({
            status: 'error',
            message: err
        });
        else
        {
          controllername.postNewDataInBook(req,res);
        }
        //controllername.postNewDataInBook(req,res);
    });
};

const Validateupdaterequest = (req,res) => {
    let headerobj ={
        'content-type':req.headers['content-type'],
       'x-api-key' : req.headers['x-api-key']
   };
   Joi.validate(headerobj,headerschema,(err,value) => {
    if(err)
    res.status(422).json({
        status: 'error',
        message: err
    });
    else
    {
      controllername.updateNewDataInBook(req,res);
    }
    //controllername.postNewDataInBook(req,res);
});
}

const Validatedeleterequest = (req,res) => {
   Joi.validate(req.query.author,schema,(err,value) => {
    if(err)
    res.status(422).json({
        status: 'error',
        message: err
    });
    else
    controllername.deleteAuthorRecordFromBook(req,res);
})
}
module.exports.Validategetrequest = Validategetrequest;
module.exports.Validatepostrequest = Validatepostrequest;
module.exports.Validateupdaterequest = Validateupdaterequest;
module.exports.Validatedeleterequest = Validatedeleterequest;
//const {error, value} = Joi.validate({ a: 'a string' }, schema);