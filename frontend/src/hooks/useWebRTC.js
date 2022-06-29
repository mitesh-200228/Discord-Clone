import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

const users = [
  {
    id: 1,
    name: "Mitesh Bediya",
  },
  {
    id: 2,
    name: "Chris Hemsworth",
  },
];

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback(users);
  const audioElements = useRef({
    id:instance
  });
  const connections = useRef({});
  const localMediaStream = useRef(null);

  const provideRef = (instance,userId) => {
    audioElements.current[userId] = instance;
  }

  const addNewClients = useCallback(
    (newClient,cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if(lookingFor === undefined){
            setClients((prev) => {
                
            })
        }
    },
    [clients,setClients]
  )

  useEffect(()=>{
    const startCapture = async() => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio:true
        })
    };
    startCapture().then(()=>{

    }).catch(err=>{

    });
  },[]);

  return { clients,provideRef };
};
