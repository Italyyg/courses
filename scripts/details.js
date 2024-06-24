"use strict"

window.onload = () =>{

    console.log("ITS ALIVE!");


    const urlParams = new URLSearchParams(location.search);

    console.log(urlParams.get("courseid"));

    if(urlParams.has("courseid")){

        //if we have a course id, display its details
        displayCourseDetails(urlParams.get("courseid"));
    }else{
        //let them know we didnt have  a valid course id and send them back to courses
        alert("no valid course Id");
        window.location.href ="./index.html";
    }

}

async function displayCourseDetails(courseid){

    //get the course details
    let courseDetails = await getCourseDetails(courseid);

    console.log(courseDetails);

    //get the div where we want to put the details for the course
    let courseDetailsDiv = document.querySelector("#courseDetails");

    //JSON stringify the output
    courseDetailsDiv.innerHTML = `
     <div>courseId : ${courseDetails.id}</div>
    <div>courseName : ${courseDetails.courseName}</div>
    <div>instructor : ${courseDetails.instructor}</div>
    <div>numDays : ${courseDetails.numDays}</div>`
}

async function getCourseDetails(courseid){

    try{
    //use fetch to get the details for the specific course
    let response = await fetch("http://localhost:8081/api/courses/"+ courseid);
    //deal with the response to get the data
    let data = await response.json();

    //returning the data we got back from the link 
    return data;

    } catch(err){
        console.log(err);
        throw new Error(err);
    }

}