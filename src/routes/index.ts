import express from 'express'
import productsRoute from './api/productsRoute'
const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('Welcome to store front api!')
})

routes.use('/products', productsRoute)

export default routes
