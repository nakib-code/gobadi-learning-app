import {Router} from "express"
import pool from "../../config/db.js"
import jwt from "jsonwebtoken"
import authMiddleware from "../../middlewares/auth.middleware.js";


const router= Router()

router.get("/auth/profile", authMiddleware, async (req, res) => {

  const id = req.user.userID

  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]
  );

  return res.json({
    success: true,
    data: result.rows[0],
  });
});

router.post("/auth/registration", async (req, res, next)=>{
    try {
        const {name, email, password} = req.body
        const result = await pool.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, created_at
            `,
            [name, email, password]
        )

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            data: result.rows[0]
        })
    } catch (error) {
        next(error)
    }
})

router.post("/auth/login", async(req, res, next)=> {
    try {
       const {email, password} = req.body
       
       const result = await pool.query(
        `SELECT * FROM users WHERE email = $1
        `,
        [email]
       )
       const user = result.rows[0]

       if(password !== user.password) {
        throw new Error ("Password invalid")
       }
       const token = jwt.sign(
        {userID: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
       )

       return res.status(200).json({
        success: true,
        message: "Login successfull",
        data: {
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
       })
    } catch (error) {
        next(error)
    }
})

router.post("/auth/logout", async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Logout successfull"
    })
})
export const authRouter = router