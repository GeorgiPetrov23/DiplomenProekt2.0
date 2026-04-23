import express from 'express';
import cookieParser from 'cookie-parser';
import { authMiddleware } from '../middlewares/authmiddleware.js';
import session from 'express-session';
import { tempData } from '../middlewares/tempDataMiddleware.js';

export default function expressInit(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }))
    app.use(authMiddleware);
    app.use(tempData);
}