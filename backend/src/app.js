import express from 'express'
import usuariosRouter from './routes/usuario.routes.js'
import emprestimosRouter from './routes/emprestimo.routes.js'
import livrosRouter from './routes/livro.routes.js'
import authRouter  from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors  from 'cors'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/livros', livrosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/emprestimos', emprestimosRouter);

export default app;