const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let users = require('../../Users')

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    }
    else {
        res.sendStatus(4)
    }
})

//create new user
router.post('/', (req, res) => {
    const newuser = {
        id: uuid.v4(),
        ut_id: req.body.ut_id,
        grade: req.body.grade
    }

    if(!newuser.ut_id || !newuser.grade){
        return res.sendStatus(400)
    }

    users.push(newuser)
    res.json(users)
})

//update
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        const updated = req.body;
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.ut_id = updated.ut_id ? updated.ut_id: user.ut_id
                user.grade = updated.grade ? updated.grade: user.grade
                res.json({msg: 'User updated', user})
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        users = users.filter(user => user.id !== parseInt(req.params.id))
        res.json({msg: 'User deleted'}, users)
    }
    else{
        res.sendStatus(400)
    }
})

modules.export = router