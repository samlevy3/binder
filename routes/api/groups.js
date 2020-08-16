const express = require('express');
const router = express.Router();
const auth = require ('../../middleware/auth');
const userModel = require('../../models/userModel');
const groupsModel = require('../../models/groupsModel')

router.route('/generate').post(auth, async (req, res) => {
    try {
        const courseName= req.body.courseName;
        const id = req.user;
        const user = await userModel.findById(id);
        const members = await userModel.find({ classes: {$elemMatch: {name: courseName}}}).limit(3);
        if (members.length > 0) {
            res.json({
                courseName,
                members
            });
        
        const memberObjects = [{
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }];
        for (let index = 0; index < members.length; index++) {
            await updateGroupStatusForMember(members[index], courseName);
            if (members[index]._id !== id) {
                memberObjects.push({
                    id: members[index]._id,
                    name: members[index].name,
                    email: members[index].email,
                    phone: members[index].phone
                })
            }
        }
        const newGroup = new groupsModel({
            course: courseName, 
            members: memberObjects
        });
        await newGroup.save();
        res.json(newGroup);
        } else {
            res.json({msg: "Oops, doesn't look like you have any friends"})
        }
    } catch (err) {
        res.json({err: err.message});
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

async function updateGroupStatusForMember(member, courseName) {
    let updatedClasses = member.classes;
    updatedClasses.forEach(course => {
        if (course.name === courseName) {
            course.inGroup = true;
        }
    })
    await userModel.updateOne(
        {_id: member._id, classes: courseName}, 
        {
            $set: {
                inGroup: false
            }
            
        })
    
}
module.exports = router;