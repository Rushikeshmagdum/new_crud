const router = require('express').Router();
const UserSchema = require('../schema/userSchema');


//Method To Render Manage Users Page
router.get('/', (req, res) => {
    UserSchema.find((err, users) => {
        if (err)
            throw err;
        else
            res.render('manageUsers/index', { users: users });
    });

});


// //Route To Render Add New User PAge
// router.get('/add', (req, res)=>{
//     res.render('manageUsers/add');
// });

// //Route To Create New User
// router.post('/add', (req, res)=>{

// });

//Routes For Creating New User
router.route('/add').get((req, res) => {
    res.render('manageUsers/add');
}).post((req, res) => {
    let newUser = new UserSchema(req.body);
    newUser.save((err) => {
        if (err)
            throw err;
        else
            res.redirect('/manageUsers/');
    });
});

//Routes For Editing New User
router.get('/edit/:userId', (req, res) => {
    UserSchema.findOne({ _id: req.params.userId }, (err, user) => {
        if (err)
            throw err;
        else
            res.render('manageUsers/edit', { user: user });
    });

});

router.post('/edit', (req, res) => {
    UserSchema.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, (err) => {
        if (err)
            throw err;
        else
            res.redirect('/manageUsers/');
   });
});

//Route To Delete User
router.get('/delete/:userId', (req, res)=>{
    UserSchema.findOneAndDelete({_id: req.params.userId}, (err)=>{
        if(err)
            throw err;
        else
            res.redirect('/manageUsers/');
    });
}) 


module.exports = router;