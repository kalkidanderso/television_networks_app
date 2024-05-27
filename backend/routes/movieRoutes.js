import express from 'express';
import { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, getCategoryWithMovieCount, getProgramGrowth, getTypeWithMovieCount } from '../controller/MovieController.js';

const router = express.Router();

router.get('/movies', getAllMovies);
router.get('/movies/categories', getCategoryWithMovieCount);
router.get('/movies/growth', getProgramGrowth);
router.get('/movies/type', getTypeWithMovieCount);

router.get('/movies/:id', getMovieById);


router.post('/movies', addMovie);
router.patch('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);


export default router;
