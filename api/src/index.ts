import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import { router } from './router';

mongoose.connect(process.env.MONGODB_ACCESS_KEY)
    .then(()=> {
        const app = express();

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

        app.use(express.json());
        app.use(router);

        app.listen(3001, () => {
            console.log('Server is running on http://localhost:3001');
        });
    })
    .catch(() => console.log('Erro ao conectar no mongodb'));


