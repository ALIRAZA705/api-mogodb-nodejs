const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const students = require("./students")
//get all data from data base
router.get('/', (req, res, next) => {
    students.find()
        .then(result=>{
            res.status(200).json({studentData:result});
        }).catch(error=>{
            console.log(error);
            res.status(500).json({error:error})
        });
    
    
})
//get data by id
router.get('/:id', (req, res, next) => {
    students.findById(req.params.id)
        .then(result=>{
            res.status(200).json({studentData:result});
        }).catch(error=>{
            console.log(error);
            res.status(500).json({error:error})
        });
    console.log(req.params.id)  
})
//post studentdata
router.post('/', (req, res, next) => {
    const student = new students({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
    })

    student.save().then(result => {
        console.log(result)
        res.status(200).json({ newstudent: result })
    })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error })
        })
})
//delete student data
router.delete('/:id', (req, res, next) => {
    students.remove({_id:req.params.id})
        .then(result=>{
            res.status(200).json({
                messgae:'product deleted',
                studentData:result
            });
        }).catch(error=>{
            console.log(error);
            res.status(500).json({error:error})
        });
    console.log(req.params.id)  
})
//put request
router.put('/:id', (req, res, next) => {
    students.findByIdAndUpdate({_id:req.params.id},{
        $set:{  name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender}
    })
        .then(result=>{
            res.status(200).json({studentData:result});
        }).catch(error=>{
            console.log(error);
            res.status(500).json({error:error})
        });
    console.log(req.params.id)  
})
module.exports = router;