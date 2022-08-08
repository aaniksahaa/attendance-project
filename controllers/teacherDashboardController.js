const Classdate = require('../models/Classdate')
const fs = require('fs')

var title = "Teacher Dashboard"

exports.saveToDb = async (req, res) => {
    
    //console.log(req.body)

    let f = parseInt(req.body.firstroll)
    let l = parseInt(req.body.lastroll)

    let attendees = req.body.attendees

    let nowDate = new Date()
    console.log(nowDate)
    let nowHash = 2500*(nowDate.getFullYear() - 2000) + 50*nowDate.getMonth() + nowDate.getDate() 
    

    for(let i=f;i<=l;i++)
    {
        if(attendees.includes(i.toString()))
        {
            Classdate.findOneAndUpdate(
                { dateHash: nowHash, "attended.roll": i },
                { $set: { "attended.$.attend" : 1 } },
                {new: true}
            ).then(() => {
                
            })
            .catch(e => {
                console.log(e)
            })
        }
        else
        {
            Classdate.findOneAndUpdate(
                { dateHash: nowHash, "attended.roll": i },
                { $set: { "attended.$.attend" : 0 } },
                {new: true}
            ).then(() => {
                
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    let firstroll = "1";
    let lastroll = "0";
    let title = "Teacher Dashboard"
    let data = [{roll:0, attend:0}]
    res.render('pages/teacherDashboard.ejs',{title,firstroll,lastroll,data});



    /*
    let title = "Teacher Dashboard"
    
    let nowDate = new Date()
    console.log(nowDate)
    let nowHash = 2500*(nowDate.getFullYear() - 2000) + 50*nowDate.getMonth() + nowDate.getDate() 
    
    let attended = [0]

    let classdate = new Classdate({
        nowHash,
        attended
    })
 
    const d = await Classdate.findOne({ dateHash : nowHash });
    if (d) console.log("Date already added");
    else
    {
        classdate.save()
            .then(c => {
                
            })
            .catch(e => {
                console.log(e)
            })
        
        console.log('Date Saved')

        res.render('pages/teacherDashboard.ejs',{title,firstroll,lastroll});

    }
    */

}

exports.getPage = async (req, res) => {
    let firstroll = "1";
    let lastroll = "0";
    let title = "Teacher Dashboard"
    let data = [{roll:0, attend:0}]
    res.render('pages/teacherDashboard.ejs',{title,firstroll,lastroll,data});
}

exports.checkAttendance = async (req, res) => {

    var dat = "First,Second"
    dat += "\r\nThird,Forth"
    fs.writeFileSync("FILE.csv", dat)

    let { firstroll, lastroll } = req.body

    let title = "Teacher Dashboard"
    
    let nowDate = new Date()
    console.log(nowDate)
    let nowHash = 2500*(nowDate.getFullYear() - 2000) + 50*nowDate.getMonth() + nowDate.getDate() 
    
    let attended = []
    for(let i=1;i<=500;i++)
    {
        attended.push({roll:i,attend:-1});
    }

    let classdate = new Classdate({
        dateHash : nowHash,
        attended
    })

    console.log(nowHash)
    //console.log(attended)

    //console.log(classdate)

    let data = []
    for(let i=parseInt(firstroll);i<=parseInt(lastroll);i++)
    {
        data.push({roll:i,attend:1});
    }
 
    const d = await Classdate.findOne({ dateHash : nowHash });
    if (d) 
    {
        console.log("Date already added");
        console.log(d);
        for(let i=parseInt(firstroll);i<=parseInt(lastroll);i++)
        {
            if(d.attended[i-1].attend == 0)
            {
                console.log(i.toString()+' already absent')
                data[i-parseInt(firstroll)] = 0;
            }
        }
    }
    else
    {
        classdate.save()
            .then(c => {
                
            })
            .catch(e => {
                console.log(e)
            })
        
        console.log('Date Saved')


    }

    res.render('pages/teacherDashboard.ejs',{title,firstroll,lastroll,data});

    /*

    try {
        notice.save()
            .then(c => {
                
            })
            .catch(e => {
                console.log(e)
            })

        console.log('Notice Saved')
        alertMsg = "Notice added. Please refresh in case you can't see it yet."
        
        let sv = await Variable.findOne({"name" : "postCount"})
        let nowCount = sv.value
        console.log(nowCount)
        let newvalue = nowCount + 1
        console.log(newvalue)
        let visitCount = req.session.visitCount

        let newCount = getCount(nowCount-visitCount)
        console.log('Updating')
        Variable.findOneAndUpdate(
            { "name": "postCount" },
            {$set: {
                "value": newvalue
            }
            },
            {new: true}
        ).then(() => {
            
        })
        .catch(e => {
            console.log(e)
        })
        console.log('Updated')
        Notice.find().sort({"_id" : -1}).limit(60)
            .then(notices => {
                res.render('pages/teacherNotices.ejs', { pins, notices, alertMsg, title, newCount })
            })
            .catch(e => {
                console.log(e)
            })
    } catch(e){
        console.log(e)
    }

    */
}

