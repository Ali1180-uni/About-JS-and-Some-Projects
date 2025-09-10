import { useState } from "react";

export default function Comment() {
    let [Comment, setComment] = useState({
        user: "",
        remarks: "",
        rating: "",
    });
    let getRemarks = (event) => {
        setComment((values)=>{
            return{
                ...values, [event.target.name]: event.target.value
            }
        })
    }
    let forSubmit = (event) => {
        event.preventDefault();
        setComment({
            user: "",
            remarks: "",
            rating: ""
        });
    }
    return (
        <form onSubmit={forSubmit}>
            <h2>Leave a Comment</h2>
            <label htmlFor="User">Enter the Username</label>
            <br />
            <input type="text" id="User" placeholder="Username" name="user" onChange={getRemarks} value={Comment.user} />
            <br /><br />
            <label htmlFor="remarks">Enter the Remarks</label>
            <br />
            <textarea type="text" id="remarks" placeholder="Remarks" name="remarks" onChange={getRemarks} value={Comment.remarks} />
            <br /><br />
            <label htmlFor="User">Enter the Rating</label>
            <br />
            <input type="number" min={1} max={5} placeholder="Rating" name="rating" onChange={getRemarks} value={Comment.rating} />
            <br /> <br />
            <button>Submit Comment</button>
        </form>
    )
}