const express=require("express");
const app=express();
app.use(express.json());

var  mentors=[
    {id:1, name:'ragav',students:[]},
    {id:2,name:"lavish",students:[]},
];
var students=[
    {id:1,name:"selvi",mail:"selvi@gmail.com",mentor:[]}
]


/** get all mentors */
app.get("/mentors",(req, res)=>{
    res.send(mentors);
})
/** get particular mentor */

app.get("/mentors/:id",(req, res)=>{
    const mentor=mentors.find(m=>m.id === parseInt(req.params.id))
    if(!mentor) res.status(404).send("Mentor not found")
    res.send(mentor)
})

/** create mentor */
app.post("/create_mentor",(req, res)=>{
    const mentor={
        id:mentors.length+1,
        name:req.body.name,
        student:[]
    }
    mentors.push(mentor);
    res.send("updated")
})

/** create student */
app.post("/create_student",(req, res)=>{
    const student={
        id:students.length+1,
        name:req.body.name,
        mail:req.body.mail,
        mentor:[]

    }
    students.push(student);
    res.send(`student  ${student.name} updated`)
})
/** get student */

app.get("/students",(req, res)=>{
    res.json(students)
});

/** get particular student */
app.get("/student/:id",(req, res)=>{
    const student=students.find(m=>m.id === parseInt(req.params.id))
    if(!student) res.status(404).send("Mentor not found")
    res.send(student)
})


/** assign student to a mentor */
app.post("/assign_mentor/:id",(req, res)=>{
    mentor=mentors.find(m=>m.id === parseInt(req.params.id))
    if(!mentor) res.status(404).send("mentor not found")
    console.log(mentor)
    const student={
        name:req.body.name,
        id:req.body.id
    
    }
    mentor.students.push(student)
    res.send(`studet with name ${student.name} assigned to ${mentor.name}`)
})

/** show all students of particular mentor */

app.get("/mentor_students/:id",(req, res) => {
    mentor=mentors.find(m=>m.id=== parseInt(req.params.id))
    const student=mentor.students
    res.json(student)

})
/** assign or change mentor for student */
app.put("/change_mentor/:id",(req, res) => {
    const student=students.find(s=>s.id=== parseInt(req.params.id));
    if(!student) res.status(404).send("student not found");
    const mentor_name=req.body
    //student.mentor=""
    student.mentor.push(mentor_name)
    res.send("updated successfully")
    console.log(student)
    
})

/** delete a mentor */

app.delete("/delete_mentor/:id",(req, res) => {
    let id= parseInt(req.params.id)
    mentors.splice(id,1)
    res.send("deleted successfully")
    
})






app.listen(3000,()=>console.log("started"))