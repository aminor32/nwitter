import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import { updateProfile } from "firebase/auth";
// import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default ({ userObj }) => {
    const hisory = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        hisory.push("/");
    };
    const onChange = (event) => {
        const {
            target:{ value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== "newDisplayName") {
            await updateProfile(userObj, {
                displayName: newDisplayName,
            })
        }
    }
    /* const getMyNweets = async() => {
        const nweets = await getDocs(query(
            collection(dbService, "nweets"), 
            where("creatorId", "==", userObj.uid), 
            orderBy("createdAt", "desc")
        )); // 맞는지 확실 X
    }
    useEffect(() => {
        getMyNweets();
    }) */
    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
