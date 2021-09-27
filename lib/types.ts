import express from "express";
import { EventEmitter } from 'events';


export type RequestAuth=Request &{
    session:express.Request  &{
        loggedIn:Boolean
    }
};