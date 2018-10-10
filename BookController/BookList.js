'use strict';

const fs = require('fs')

const filepath = './config/Book.json';
const lodash = require('lodash');
//const JoiValidation = require('./JOIValidator/JOIValidation.js');


const getAllSummary = (req, res, next) => {
    console.log(vs);
    fs.readFile(filepath, function (err, data) {
        if (data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
        else {
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        }

    });
};

const getAllDataAsPerTheName = (req, res) => {
    let statusAfterValidation;
    let querystrings = req.query.name;
    let querystringaftermodifictaion = 1;
    let result;
    fs.readFile(filepath, function (err, data) {

        if (data) {
            var str = data.toString();
            var books = JSON.parse(str);

            result = books.filter(x=> x.author.match(querystrings)).map(x=>{return {"author":x.author};});
             
                console.log(result);
                res.status(200).json({
                    message: result
                });

            }
       else {
            res.status(422).json({
                status: 'error',
                message: err
            });
        }
    });

};


const postNewDataInBook = (req, res) => {
    let dataPostedByUser =[];
    dataPostedByUser = req.body;
    let querystrings = req.query.name;
    let querystringaftermodifictaion = 1;
    let result;
    fs.readFile(filepath, function (err, data) {

        if (data) {
            var str = data.toString();
            var books = JSON.parse(str);
            let ArrayPostedAlreadyExists = lodash.includes(books,dataPostedByUser);
            if(ArrayPostedAlreadyExists)
            {
                res.status(200).json({message:'data already exists'});
            }
            else
            {
                console.log(books);
                console.log(dataPostedByUser);
                books.push(dataPostedByUser);
             
             fs.writeFile(filepath, JSON.stringify(books) , 'utf-8',function(err)
              {
                  if(err)
                  {
                      res.status(500).json({message:'internal server error occured'});
                  }
                  else
                  {
                      res.status(200).json({message:'posted successfully'});
                  }
              });
            }
             
        }
       else {
            res.status(422).json({
                status: 'error',
                message: err
            });
        }
    });

};

const updateNewDataInBook = (req,res)=>{
    
    let dataPostedByUser = req.body;
    fs.readFile(filepath, function (err, data) {
        if (data) {
            let str = data.toString();
            let books = JSON.parse(str);
            let checkWhetherAuthornameExistsOrNot = -1;
           // checkWhetherAuthornameExistsOrNot =  lodash.indexOf(books,dataPostedByUser.author);
            checkWhetherAuthornameExistsOrNot = books.findIndex(function(element){
                return element.author == dataPostedByUser.author
            });
            //lobooks.filter(x=> x.author.match(dataPostedByUser.author));
           
            console.log(checkWhetherAuthornameExistsOrNot);
            //let ArrayPostedAlreadyExists = lodash.includes(books,dataPostedByUser);
            if(checkWhetherAuthornameExistsOrNot == -1)
            {
                res.status(200).json({message:'Data does not exists.Cannot update the record'});
            }
            else
            {
               //let position =  lodash.indexOf(books,dataPostedByUser.author);
               books[checkWhetherAuthornameExistsOrNot] = dataPostedByUser;
               fs.writeFile(filepath, JSON.stringify(books) , 'utf-8',function(err)
              {
                  if(err)
                  {
                      res.status(500).json({message:'internal server error occured'});
                  }
                  else
                  {
                      res.status(200).json({message:'updated successfully'});
                  }
              });
            }
                  }
               });
}

const deleteAuthorRecordFromBook = (req,res)=> {
    let authorNameToDelete = req.query.author;
    fs.readFile(filepath, function (err, data) {
        if(data)
        {
            let str = data.toString();
            let books = JSON.parse(str);
            let AuthornameIndex = -1;
            AuthornameIndex = books.findIndex(function(element){
                return element.author == authorNameToDelete;
            });
            if(AuthornameIndex != -1)
            {
                books.splice(AuthornameIndex,1);
               console.log(books);
              fs.writeFile(filepath, JSON.stringify(books) , 'utf-8',function(err)
             {
                 if(err)
                 {
                     res.status(500).json({message:'internal server error occured'});
                 }
                 else
                 {
                     res.status(200).json({message:'deleted successfully'});
                 }
             });
            }
            else
            {
                res.status(404).json({message:'Data does not exists.Cannot delete the record'});
            }
        }
        else
        {
            res.status(404).json({message:'Data does not exists.Cannot delete the record'});
        }

    });

}
module.exports.getAllBookData = getAllSummary;
module.exports.getAllDataAsPerTheName = getAllDataAsPerTheName;
module.exports.postNewDataInBook = postNewDataInBook;
module.exports.updateNewDataInBook = updateNewDataInBook;
module.exports.deleteAuthorRecordFromBook = deleteAuthorRecordFromBook;