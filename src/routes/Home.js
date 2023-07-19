
import { addDoc, collection, db, getDocs } from 'myFb';
import React, { useEffect, useState } from "react";

const Home = () => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    
    useEffect(()=> {
        const getTweets = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "nweets"));
                querySnapshot.forEach((doc) => {
                    const tweetObject = {
                        ...doc.data(),
                        id: doc.id,
                    };
                    setTweets((prev)=> [tweetObject, ...prev]);
                })
                
            } catch (error) {
                console.log(error);
            }
        }
        getTweets();
    }, []);

    if (!tweets) {
        return null; // 또는 로딩 스피너 등을 반환할 수 있습니다.
      }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        const docRef = await addDoc(collection(db, "nweets"), {
            nweets: tweet,
            createdAt: Date.now()
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
            return (<div>
                {tweet.nweets}
            </div>)
        })}
        </>
    )
}
export default Home;