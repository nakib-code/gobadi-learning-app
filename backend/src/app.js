import express from "express"
import { productRouter } from "./route/product.route.js"
import { authRouter } from "./modules/auth/auth.route.js"
const app = express()

app.use(express.json())

app.use(authRouter)
app.use(productRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;

