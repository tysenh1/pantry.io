import express from 'express';
import itemRoutes from './api/v1/routes/itemRoutes.ts';
import recipeRoutes from './api/v1/routes/recipeRoutes.ts';
import pantryRoutes from './api/v1/routes/pantryRoutes.ts';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  res.json('yooo')
})

app.use("/api/v1/item", itemRoutes);
app.use('/api/v1/recipe', recipeRoutes)
app.use('/api/v1/pantry', pantryRoutes)

export default app;

