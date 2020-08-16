const express = require('express');
const router = express.Router();
const auth = require ('../../middleware/auth');
const userModel = require('../../models/userModel');
const groupsModel = require('../../models/groupsModel');



router.route('/generate').post(auth, async (req, res) => {
    try {

      const id = req.user
      const user = await userModel.findById(id);
      const courseName= req.body.courseName;
      const smallGroups = await groupsModel.find({ course: courseName});
      let smallGroup = "";
      for (let index = 0; index < smallGroups.length; index++) {
        if (smallGroups[index].members.length < 4) {
            smallGroup = smallGroups[index];
            break;
        }
      }
      if (smallGroup) {
        const response = await groupsModel.updateOne({_id: smallGroup._id}, {$addToSet: {members: 
            {
                name: user.name,
                id: user._id,
                phone: user.phone,
                email: user.email
        }}});
        return res.json(smallGroup);
      }
      const members = await userModel.find({ classes: {$elemMatch: {name: courseName, inGroup: false}}}).limit(3)
        
      if (members.length > 1) {
        for (let index = 0; index < members.length; index++) {
            await updateGroupStatusForMember(members[index], courseName);
        }
        let memberIds = []
        members.forEach(member => memberIds.push({id: member._id, name: member.name, phone: member.phone, email: member.email}))

        const newGroup = new groupsModel({
            course: courseName, 
            members: memberIds
        });
<<<<<<< HEAD
=======

>>>>>>> e1a95e9f7d3d6053c14c738c93d442ea83cc7f89
        await newGroup.save();

        res.json(newGroup);
    } else {
        res.json({msg: "Oops, doesn't look like you have any friends"})
    }
  } catch (err) {
        res.json({err: err.message});

    }
});

router.route('/forUser').get( auth, async (req, res) => {
    try {
        const groups = await groupsModel.find({ members: {$elemMatch: {id: req.user}}})
        res.json(groups)
    } catch (err) {
        res.json({err: err.message})
    }
    
});

router.route('/all').get(async (req, res) => {
    const groups = await groupsModel.find()
    if (groups){
        res.json(groups)
    } else {
        res.json({msg: "Error"})
    }
    
})

router.route('/:course').get(async (req, res) => {
    const groups = await groupsModel.find({course: req.params.course})
    if (groups){
        res.json(groups)
    } else {
        res.json({msg: "Error"})
    }
    
})

async function updateGroupStatusForMember(member, courseName) {
    let updatedClasses = member.classes;
    updatedClasses.forEach(course => {
        if (course.name === courseName) {
            course.inGroup = true;
        }
    })
    await userModel.updateOne(
        {_id: member._id}, 
        {
            $set: {
                classes: updatedClasses
            }
            
        })
}

module.exports = router;