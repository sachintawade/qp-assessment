import express, { Request, Response } from "express";
import serverRoutes from './routes/server';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', serverRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!')
})

app.listen(3000, () => console.log('App is listen on port 3000'))