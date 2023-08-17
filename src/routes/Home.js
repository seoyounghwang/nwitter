
import Nweet from 'components/Nweet';
import { orderBy } from 'firebase/firestore';
import { addDoc, collection, db, onSnapshot } from 'myFb';
import React, { useEffect, useState } from "react";
import { Audio } from 'react-loader-spinner';

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    
    useEffect(()=> {

        onSnapshot(collection(db, "nweets"),orderBy("createdAt", "desc"), (snapshot)=> {
            const nweetsArray = snapshot.docs.map((doc)=> ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(nweetsArray);
        });
    }, []);

    if (!tweets) {
        return <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />; // 또는 로딩 스피너 등을 반환할 수 있습니다.
      }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        const docRef = await addDoc(collection(db, "nweets"), {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid 
        });
        
        } catch (e) {
        console.error("Error adding document: ", e);
        }
        setTweet("");
    }

    const onChange = ({target: {value}}) => setTweet(value);

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type='text' value={tweet} onChange={onChange} maxLength={120} placeholder="What's on your mind?"/>
            <button type='submit'>Tweet</button>
        </form>
        {tweets.map((tweet)=> {
            return (<Nweet key={tweet.id} nweetObj={tweet} isOwner={userObj.uid === tweet.creatorId}/>)
        })}
        </>
    )
}
export default Home;