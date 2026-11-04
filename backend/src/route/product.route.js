import { Router } from "express";
import pool from "../config/db.js";


const router = Router();

router.get("/product", async (req, res, next) => {
  try {

    const result = await pool.query(
      `SELECT id, name, description, price, stock FROM products
       `,
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    
    if (!name || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isFinite(Number(price)) ||
      !Number(price) < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name must be a non-empty string and price must be a valid non-negative number",
      });
    }

    if (
      stock !== undefined &&
      (!Number.isFinite(Number(stock)) || Number(stock) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a non-negative integer",
      });
    }
    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `,[name, description, price, stock]
    );

    await redisClient.del(CACHE_KEY)
    
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const result = await pool.query(
      `SELECT id, name, description, price, stock
            FROM products
            WHERE id = $1
            `,
      [id],
    );

    if(result.rows.length === 0){
        return res.status(400).json({
            success:false,
            message: "Product not found",
        })
    }

    return res.status(200).json({
      success: true,
      message: "Product fecthed successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async(req, res, next) => {
    try {
        const {id} = req.params;
        const {name, description, price, stock} =req.body;

        const result = await pool.query(
            `UPDATE products 
            SET name = $1,
                description = $2,
                price = $3,
                stock = $4,
                updated_at = NOW()
            WHERE id =$5
            RETURNING
            `,
            [name, description, price, stock, id]
        )

        return res.status(200).json({
            success:true,
            message: "Product update succssfully",
            data: result.rows[0]
        })
    } catch (error) {
        
    }
})

router.delete("/:id", async(req, res, next) => {
  try {
    const {id} = req.params;

    const result = await pool.query(
      `DELETE FROM products
      WHERE id = $1
      `,[id]
    )
    return res.status(201).json({
      success: true,
      message: "Deleted successfully"
    })
  } catch (error) {
    next(error)
  }
})
export const productRouter = router;
