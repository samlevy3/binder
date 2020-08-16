const express = require('express');
const router = express.Router();
const auth = require ('../../middleware/auth');
const userModel = require('../../models/userModel');
const groupsModel = require('../../models/groupsModel');

router.route('/generate').post( async (req, res) => {
    const courseName= req.body.courseName;
    const members = await userModel.find({ classes: {$elemMatch: {name: courseName, inGroup: false}}})
    if (members.length > 0) {
        res.json({
            courseName,
            members
        });
        
       
        for (let index = 0; index < members.length; index++) {
            await updateGroupStatusForMember(members[index], courseName);
        }
    
        let memberIds = []
        members.forEach(member => memberIds.push(member.id))
        console.log(memberIds)
        const newGroup = new groupsModel({
            course: courseName, 
            members: memberIds
        });
        const savedGroup = await newGroup.save();
    } else {
        res.json({msg: "Oops, doesn't look like you have any friends"})
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

async function updateGroupStatusForMember(member, courseName) {let updatedClasses = member.classes;
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