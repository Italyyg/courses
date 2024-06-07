"use strict"

window.onload = ()=>{
    //making sure we are working
    console.log("AND WE ARE LIVE!");

    populateTable();

   

}
async function populateTable(){

    //get the courses from the API
    let courses = await getCourses();

    let tbody = document.querySelector("#courseTableBody")

    //for each of the courses we will be working with a course, each one when it goes through it is a course
    //looping 
    courses.forEach((course) => {

        //call a function to build a the row
        //pass it where the row goes
        //pass it what goes in the row (data/course)
         buildRow(tbody, course)
    });
    //did we get it?
    // console.log(courses);

}
                  //parameters, what we pass through 
function buildRow(someTableBody, someData){

    //create the row fro the table
    let row = someTableBody.insertRow();

    //create cell for the department
    let departCell = row.insertCell();
    //place relevant data in 
    departCell.innerHTML = someData.dept;

    let courseCell = row.insertCell();
    courseCell.innerHTML = someData.courseNum

    let titleCell = row.insertCell();
    titleCell.innerHTML = someData.courseName
}

async function getCourses(){
    //the try says "try thrse thinhs and if it doesnt work out,fall into the catch-
    //and deal with the error"
try{
    // make the API call to get all the courses
    let response = await fetch ("http://localhost:8081/api/courses");
    let courses = await response.json();
    
    return courses;

} catch (error){
    console.log(error)
    throw new Error (error)

}
}

