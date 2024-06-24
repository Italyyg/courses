"use strict"

window.onload =()=>{

 //get the getComment form off the page
 const getCommentForm = document.querySelector("#getCommentToEdit");

 //listen for submit of the getCommentForm and attempt to populate the update form
 getCommentForm.addEventListener("submit", populateUpdateForm);

 //get the updateComment form off the page
 const updateCommentForm = document.querySelector("#updateCommentForm");

 //listen for submit of the getCommentForm and attempt to populate the update form
 updateCommentForm.addEventListener("submit", updateAComment);


}



//CRUD: (U)pdate a comment
const updateAComment = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (PUT) request to update a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/comments/" + event.target.id.value,
            {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    body: event.target.body.value,
                    email: event.target.email.value,
                    name: event.target.name.value,
                    postId: event.target.postId.value
                })
            }
        );
        //turn those comments in to something we can work with
        let updatedComment = await response.json();

        //put the comments in the console
        console.log(updatedComment)

    } catch (err) {

        //what the hell happend
        console.log("something went south", err)

    }

}
//method to help get the data for update and fill out the form for the user
const populateUpdateForm = async (event) => {
    event.preventDefault();

    //go get the single comment for the id the user selected
    let comment = await getSingleComment(event.target.commentId.value);

    //fill out the form with the data from the comment we just got from the API
    document.querySelector("#body").value = comment.body;
    document.querySelector("#email").value = comment.email;
    document.querySelector("#name").value = comment.name;
    document.querySelector("#postId").value = comment.postId;
    document.querySelector("#id").value = comment.id;

}
const getSingleComment = async (commentId) => {

    const response = await fetch("https://jsonplaceholder.typicode.com/comments/" + commentId);
    let comment = await response.json();

    return comment;

}
