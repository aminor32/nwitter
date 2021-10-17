import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";

export default ({ userObj }) => {
    const hisory = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        hisory.push("/");
    };
    const getMyNweets = async() => {
        const nweets = await getDocs(query(
            collection(dbService, "nweets"), 
            where("creatorId", "==", userObj.uid), 
            orderBy("createdAt", "desc")
        )); // 맞는지 확실 X
    }
    useEffect(() => {
        getMyNweets();
    })
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
