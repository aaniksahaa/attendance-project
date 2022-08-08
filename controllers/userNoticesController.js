const Notice = require('../models/Notice')
const Variable = require('../models/Variable')

var title = "User Notice Board"

function getValid(roll) {

    let parsed = parseInt(roll)

    if (isNaN(parsed)) { 
        n=210; } else {
            n = parsed
    }
        
    let strings = []

    if(n>=1&&n<=20) {
        strings = ["Everyone","Batch A","Batch A1"]
    }
    else if(n>=21&&n<=40) {
        strings = ["Everyone","Batch A","Batch A2"]
    }
    else if(n>=41&&n<=60) {
        strings = ["Everyone","Batch A","Batch B1"]
    }
    else if(n>=61&&n<=80) {
        strings = ["Everyone","Batch B","Batch B2"]
    }
    else if(n>=81&&n<=100) {
        strings = ["Everyone","Batch B","Batch C1"]
    }
    else if(n>=101&&n<=120) {
        strings = ["Everyone","Batch B","Batch C2"]
    }
    else if(n>=121&&n<=140) {
        strings = ["Everyone","Batch C","Batch D1"]
    }
    else if(n>=141&&n<=160) {
        strings = ["Everyone","Batch C","Batch D2"]
    }
    else if(n>=161&&n<=180) {
        strings = ["Everyone","Batch C","Batch E1"]
    }
    else if(n>=181&&n<=200) {
        strings = ["Everyone","Batch D","Batch E2"]
    }
    else if(n>=201&&n<=220) {
        strings = ["Everyone","Batch D","Batch F1"]
    }
    else {
        strings = ["Everyone","Batch D","Batch F2"]
    }
    return strings
}

function getCount(n) {
    switch(n) {
        case 0:
            return "No Unread Notice"
        case 1:
            return "One Unread Notice"
        case 2:
            return "Two Unread Notices"
        case 3:
            return "Three Unread Notices"
        case 4:
            return "Four Unread Notices"
        case 5:
            return "Five Unread Notices"
        default:
            return "5+ Unread Notices"
    }
}

exports.getAllNotices = async (req, res) => {

    alertMsg = "."
    let roll = req.session.roll

    let validstrings = getValid(roll)

    let pins = await Notice.find({pinned: "1"})

    let sv = await Variable.findOne({"name" : "postCount"})
    let nowCount = sv.value
    let visitCount = req.session.visitCount

    let newCount = getCount(nowCount-visitCount)

    req.session.visitCount = nowCount

    try {
        Notice.find().sort({"_id" : -1}).limit(60)
            .then(notices => {
                res.render('pages/userNotices.ejs', { pins, notices, alertMsg, title, newCount , validstrings })
            })
            .catch(e => {
                console.log(e)
            })
    } catch(e){
        console.log(e)
    }
}

exports.getSingleNotice = (req, res) => {
        let { id } = req.params
        Notice.findById(id)
            .then(notice => {
                res.json(notice)
            })
            .catch(e => {
                console.log(e)
            })
}



