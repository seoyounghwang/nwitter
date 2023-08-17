import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'myFb';
import React, { useState } from 'react'

const Nweet = ({nweetObj, isOwner}) => {
    const [editNweet, setEditNweet] = useState();
    const [isEditMode, setIsEditMode] = useState(false);


    const onDelete = async() => {
        const confirm = window.confirm("Are you sure you want to delete this tweet?");
        if(confirm) await deleteDoc(doc(db, "nweets", nweetObj.id));
    }

    const onEdit = async (e) => {
        e.preventDefault();
        const nweetRef = doc(db, "nweets", nweetObj.id);
        
        await updateDoc(nweetRef, {
            text: editNweet, 
            updatedAt: Date.now()
        })
        setIsEditMode(false);
    }

    const toggleEdit = () => setIsEditMode((prev)=>!prev)

    const onChange = ({target: {value}}) => setEditNweet(value);

  return (
    <div>
        {isEditMode ? 
        <>
        <form onSubmit={onEdit}>
            <input type='text' onChange={onChange} defaultValue={nweetObj.text} value={editNweet} required/>
            <button type='submit'>Edit</button>
        </form>
        <button onClick={toggleEdit}>Cancel</button>
        </>
        :
        <>
        <h4>{nweetObj.text}</h4>
        {isOwner && 
            <>
            <button onClick={onDelete}>Delete</button>
            <button onClick={toggleEdit}>Edit</button>
            </>
        }
        </>
    }
    
    
        
        
        
        {/* {isEditMode ? <input type='text' defaultValue={nweetObj.text} value={editNweet}/> : <h4>{nweetObj.text}</h4>}
        {isOwner && <><button onClick={onDelete}>Delete</button>
        {isEditMode ? <button onClick={onEdit}>Submit</button>:<button onClick={setIsEditMode((prev)=>!prev)}>Edit</button>}</>} */}
        
    </div>
  )
}

export default Nweet