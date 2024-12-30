

// Required dependencies
const port = 4000;
const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());

// MySQL database connection
const db =  mysql.createConnection({
    host: 'localhost',  // Replace localhost with 127.0.0.1
     // Change to your MySQL host if needed
  user: "root", // Replace with your MySQL username
  password: "122165", // Replace with your MySQL password
  database: "online_super_shop" // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});


// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});
const upload = multer({ storage });

// Serve images
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Add product API
app.post("/addproduct", upload.single("image"), (req, res) => {
  const { name, old_price, new_price, production_date, expire_date, product_quantity, category } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;

  const query = `INSERT INTO product (name, old_price, new_price,product_quantity, production_date, expire_date, category, image) 
                 VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
  db.query(
    query,
    [name, new_price,old_price, product_quantity, production_date, expire_date, category, image],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Success: false, error: "Database error." });
      }
      res.json({ Success: true, message: "Product added successfully." });
    }
  );
});




// Remove product API
app.post("/removeproduct", (req, res) => {
  const { id } = req.body;

  const query = `DELETE FROM product WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Success: false, error: "Database error." });
    }
    res.json({ Success: true, message: "Product removed successfully." });
  });
});




// Get all products API
app.get("/allproducts", (req, res) => {
    const query = `SELECT * FROM product`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Success: false, error: "Database error." });
      }
      // Include full image path
      const productsWithImages = results.map(product => ({
        ...product,
        image: product.image ? `http://localhost:4000${product.image}` : null
      }));
      res.json(productsWithImages);
    });
  });
  




app.get('/newitems', async (req, res) => {
  const query = `
    SELECT * 
    FROM product
    ORDER BY id ASC
    LIMIT 8 OFFSET 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Database error." });
    }

    // Ensure full image path
    const productsWithImages = results.map(product => ({
      ...product,
      image: product.image ? `http://localhost:4000${product.image}` : null // Add full URL for image
    }));

    console.log("NewCollection Fetched with images:", productsWithImages);
    res.status(200).json({ success: true, data: productsWithImages });
  });
});






// Add to cart API
app.post("/add-to-cart", (req, res) => {
  const { cart_id, products } = req.body;

  // Now add the products to the cart
  const addToCartQuery = "INSERT INTO cart_product (cart_id, product_id, quantity) VALUES ? ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)";
  const values = products.map(product => [cart_id, product.product_id, product.quantity]);

  db.query(addToCartQuery, [values], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Success: false, error: "Database error." });
    }
    res.json({ Success: true, message: "Products added to cart successfully." });
  });
});




  
// User registration API
app.post("/signup", (req, res) => {
    const { username, password, email } = req.body;
  
    const checkQuery = `SELECT * FROM customer WHERE email = ?`;
  
    db.query(checkQuery, [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Success: false, error: "Database error." });
      }
      if (results.length > 0) {
        return res.status(400).json({ Success: false, error: "User  already exists." });
      }
  
      //const cartData = JSON.stringify(Array(300).fill(0));
     const insertQuery = `INSERT INTO customer (Cust_name, password, email) VALUES (?, ?, ?)`;
  
      db.query(insertQuery, [username, password,email], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ Success: false, error: "Database error." });
        }
  
        const token = jwt.sign({ id: result.insertId }, "secret_ecom");
        res.json({ Success: true, token });
      });
    });
  });





//add to cart
  app.post("/add-to-cart", (req, res) => {
    const { cart_id, products } = req.body;
  
    if (!cart_id || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ Success: false, error: "Invalid input." });
    }
  
    // SQL Query: Insert or Update
    const addToCartQuery = `
      INSERT INTO cart_product (cart_id, product_id, quantity)
      VALUES ?
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
  
    // Map products array to match SQL input format
    const values = products.map(product => [cart_id, product.product_id, product.quantity]);
  
    db.query(addToCartQuery, [values], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ Success: false, error: "Database error." });
      }
  
      res.json({ Success: true, message: "Products added/updated in the cart successfully." });
    });
  });
  




// Remove item from cart API
app.post("/remove-from-cart", (req, res) => {
  const { cart_id, product_id } = req.body;

  const query = "DELETE FROM cart_product WHERE cart_id = ? AND product_id = ?";
  db.query(query, [cart_id, product_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Success: false, error: "Database error." });
    }
    res.json({ Success: true, message: "Item removed from cart successfully." });
  });
});







// Update cart quantity API
app.post("/update-cart-quantity", (req, res) => {
  const { cart_id, product_id, quantity } = req.body;

  const query = "UPDATE cart_product SET quantity = ? WHERE cart_id = ? AND product_id = ?";
  db.query(query, [quantity, cart_id, product_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Success: false, error: "Database error." });
    }
    res.json({ Success: true, message: "Cart quantity updated successfully." });
  });
});






// User login API with cart creation
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM customer WHERE email = ?`;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Success: false, error: "Database error." });
    }

    // Handle invalid email
    if (results.length === 0) {
      return res.status(400).json({ Success: false, error: "Invalid email." });
    }

    const user = results[0];

    // Verify the password
    if (user.password !== password) {
      return res.status(400).json({ Success: false, error: "Invalid password." });
    }

    const userId = user.Cust_id; // Retrieve user ID safely
    const username = user.name; // Assuming 'name' is the username column in your customer table

    if (!userId) {
      console.error("Cust_id is null or undefined");
      return res.status(500).json({ Success: false, error: "Failed to retrieve user ID." });
    }

    // Check if a cart already exists for the user
    const getCartQuery = "SELECT Cart_id FROM cart WHERE Cust_id = ?";
    db.query(getCartQuery, [userId], (err, cartResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Success: false, error: "Database error while fetching cart." });
      }

      if (cartResults.length > 0) {
        // User already has a cart; return the cart ID
        const cartId = cartResults[0].Cart_id;
        const token = jwt.sign({ id: userId }, "secret_ecom");
        return res.json({
          Success: true,
          userId,
          username, // Include username in the response
          cartId,
          token,
        });
      } else {
        // Create a new cart for the user
        const createCartQuery = "INSERT INTO cart (Cust_id) VALUES (?)";
        db.query(createCartQuery, [userId], (err, createResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ Success: false, error: "Database error while creating cart." });
          }

          // Return the newly created cart ID
          const newCartId = createResult.insertId;
          const token = jwt.sign({ id: userId }, "secret_ecom");
          return res.json({
            Success: true,
            userId,
            username, // Include username in the response
            cartId: newCartId,
            token,
          });
        });
      }
    });
  });
});







  // Get cart products
app.post("/get-cart", (req, res) => {
  const { cart_id } = req.body;  // Get cart_id from query parameters
  
  if (!cart_id) {
    return res.status(400).json({ Success: false, error: "Cart ID is required." });
  }

  // SQL Query to get all products in the cart
  const getCartQuery = `
     SELECT cp.product_id, p.name, cp.quantity, p.new_price,p.old_price
  FROM cart_product cp
  JOIN product p ON cp.product_id = p.id
  WHERE cp.cart_id = ?
  `;

  db.query(getCartQuery, [cart_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Success: false, error: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ Success: false, message: "No products found in the cart." });
    }

    // Return the list of products in the cart
    res.json({
      Success: true,
      cart_id: cart_id,
      products: results
    });
  });
});








app.post('/place-order', (req, res) => {
  let { Order_date, Order_amount, Cust_id, products } = req.body;

  // If Order_date is not provided, set it to the current date
  Order_date = Order_date || new Date().toISOString().split('T')[0];

  // Input validation
  if (!Order_amount || !Cust_id || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      error: 'Order_amount, Cust_id, and products are required, and products should be an array.',
    });
  }

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({
        error: 'There was an error processing your order.',
      });
    }

    // Insert order into place_order table
    const orderQuery = `INSERT INTO place_order (Order_date, Order_amount, Cust_id) VALUES (?, ?, ?)`;
    db.query(orderQuery, [Order_date, Order_amount, Cust_id], (err, orderResult) => {
      if (err) {
        console.error('Error creating order:', err);
        return db.rollback(() => {
          res.status(500).json({
            error: 'There was an error creating the order.',
          });
        });
      }

      const orderId = orderResult.insertId;

      // Insert products into order_product table
      const orderProductQuery = `INSERT INTO order_product (order_id, product_id, quantity) VALUES ?`;
      const orderProductData = products.map((product) => [
        orderId,
        product.product_id,
        product.quantity,
      ]);

      db.query(orderProductQuery, [orderProductData], (err, orderProductResult) => {
        if (err) {
          console.error('Error inserting products into order:', err);
          return db.rollback(() => {
            res.status(500).json({
              error: 'There was an error inserting products into the order.',
            });
          });
        }

        // Remove the ordered items from the cart
        const productIds = products.map((product) => product.product_id);
        const placeholders = productIds.map(() => '?').join(', ');

        const removeFromCartQuery = `
          DELETE cp
          FROM cart_product cp
          JOIN cart c ON cp.cart_id = c.cart_id
          WHERE c.Cust_id = ? AND cp.product_id IN (${placeholders})
        `;

        db.query(removeFromCartQuery, [Cust_id, ...productIds], (err, cartRemoveResult) => {
          if (err) {
            console.error('Error removing items from cart:', err);
            return db.rollback(() => {
              res.status(500).json({
                error: 'There was an error removing items from the cart.',
              });
            });
          }

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              console.error('Error committing transaction:', err);
              return db.rollback(() => {
                res.status(500).json({
                  error: 'There was an error finalizing the order.',
                });
              });
            }

            console.log("Transaction committed successfully.");
            res.status(201).json({
              message: 'Order placed successfully, and items removed from cart',
              order_id: orderId,
            });
          });
        });
      });
    });
  });
});









app.post('/create-payment', (req, res) => {
  const { order_id, payment_method, cust_id } = req.body;

  if (!order_id || !payment_method || !cust_id) {
    return res.status(400).json({
      error: 'order_id, payment_method, and cust_id are required.',
    });
  }

  // Check if customer exists
  const checkCustomerQuery = 'SELECT Cust_id FROM customer WHERE Cust_id = ?';
  db.query(checkCustomerQuery, [cust_id], (err, results) => {
    if (err) {
      console.error('Error checking customer ID:', err);
      return res.status(500).json({ error: 'Error checking customer ID.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    // Fetch order amount
    const getOrderAmountQuery = 'SELECT Order_amount FROM place_order WHERE order_id = ? AND Cust_id = ?';
    db.query(getOrderAmountQuery, [order_id, cust_id], (err, results) => {
      if (err) {
        console.error('Error fetching order amount:', err);
        return res.status(500).json({ error: 'Error fetching order amount.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Order not found for the given order_id and cust_id.' });
      }

      const orderAmount = results[0].Order_amount;

      // Insert payment record with order_id
      const createPaymentQuery = `
        INSERT INTO payment (payment_date, payment_amount, payment_method, cust_id, order_id)
        VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?)
      `;
      db.query(createPaymentQuery, [orderAmount, payment_method, cust_id, order_id], (err, paymentResult) => {
        if (err) {
          console.error('Error inserting payment record:', err);
          return res.status(500).json({ error: 'Error creating payment.' });
        }

        // Insert tracking details with default status
        const insertTrackingDetailsQuery = `
          INSERT INTO tracking_details (order_id, order_status, updated_at)
          VALUES (?, 'Ongoing', CURRENT_TIMESTAMP)
        `;
        db.query(insertTrackingDetailsQuery, [order_id], (err, trackingResult) => {
          if (err) {
            console.error('Error inserting tracking details:', err);
            return res.status(500).json({ error: 'Error inserting tracking details.' });
          }

          // Delete related products from order_product
          const deleteOrderProductsQuery = 'DELETE FROM order_product WHERE order_id = ?';
          db.query(deleteOrderProductsQuery, [order_id], (err, deleteResult) => {
            if (err) {
              console.error('Error deleting order products:', err);
              return res.status(500).json({ error: 'Error deleting order products.' });
            }

            res.status(201).json({
              message: 'Payment created successfully, tracking details added, and order products deleted.',
              payment_id: paymentResult.insertId,
              payment_amount: orderAmount,
              tracking_id: trackingResult.insertId,
            });
          });
        });
      });
    });
  });
});









app.get('/admin/orders', (req, res) => {
  const query = `
    SELECT 
      place_order.order_id,
      place_order.Order_date,
      place_order.order_amount AS payment_amount,
      MAX(payment.payment_method) AS payment_method,  
      MAX(payment.payment_date) AS payment_date,  
      MAX(customer.Cust_name) AS cust_name,  
      MAX(tracking_details.order_status) AS order_status,  
      MAX(tracking_details.delivery_date) AS delivery_date,  
      MAX(tracking_details.updated_at) AS updated_at  
    FROM 
      place_order
    LEFT JOIN 
      payment ON place_order.Cust_id = payment.Cust_id
    LEFT JOIN 
      customer ON place_order.Cust_id = customer.Cust_id
    LEFT JOIN 
      tracking_details ON place_order.order_id = tracking_details.order_id
    WHERE 
      payment.payment_amount = place_order.order_amount
    GROUP BY
      place_order.order_id
    ORDER BY 
      place_order.Order_date DESC;
  `;

  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders.', details: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }

    res.status(200).json({
      message: 'Orders retrieved successfully.',
      data: rows,
    });
  });
});






 


app.post('/admin/tracking/update', async (req, res) => {
  const { order_id, order_status, delivery_date } = req.body;

  if (!order_id || (!order_status && !delivery_date)) {
    return res.status(400).json({ error: 'Order ID, status, or delivery date is required.' });
  }

  try {
    const numericOrderId = parseInt(order_id, 10);

    if (isNaN(numericOrderId)) {
      return res.status(400).json({ error: 'Invalid order ID.' });
    }

    const updateFields = [];
    const params = [];

    if (order_status) {
      updateFields.push('order_status = ?');
      params.push(order_status);
    }
    if (delivery_date) {
      updateFields.push('delivery_date = ?');
      params.push(delivery_date);
    }

    // Always set the updated_at field
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(numericOrderId);

    const query = `UPDATE tracking_details SET ${updateFields.join(', ')} WHERE order_id = ?`;
    
    const result = await new Promise((resolve, reject) => {
      db.query(query, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found or already updated.' });
    }

    res.status(200).json({ message: 'Tracking details updated successfully.' });
  } catch (error) {
    console.error('Error updating tracking details:', error);
    res.status(500).json({ error: 'Failed to update tracking details.' });
  }
});








app.post('/user/orders', (req, res) => {
  const { cust_id } = req.body; // Get cust_id from the request body

  if (!cust_id) {
    return res.status(400).json({ Success: false, error: 'Customer ID (cust_id) is required.' });
  }

  // SQL query to fetch orders and related details
  const query = `
   SELECT DISTINCT
  place_order.order_id,
  place_order.Order_date,
  place_order.order_amount AS payment_amount,
  ANY_VALUE(payment.payment_method) AS payment_method, 
  GROUP_CONCAT(DISTINCT tracking_details.order_status) AS order_status,
  GROUP_CONCAT(DISTINCT tracking_details.delivery_date) AS delivery_dates,
  GROUP_CONCAT(tracking_details.updated_at) AS updated_at
FROM
  place_order
LEFT JOIN
  payment ON place_order.order_id = payment.order_id
LEFT JOIN
  tracking_details ON place_order.order_id = tracking_details.order_id
WHERE
  place_order.Cust_id = ?
GROUP BY
  place_order.order_id
ORDER BY
  place_order.Order_date DESC
LIMIT 0, 1000`;

  db.query(query, [cust_id], (err, rows) => {
    if (err) {
      console.error('Error fetching order details:', err);
      return res.status(500).json({ Success: false, error: 'Failed to fetch order details.', details: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ Success: false, message: 'No orders found for this customer.' });
    }

    res.status(200).json({
      Success: true,
      message: 'Order details retrieved successfully.',
      orders: rows,
    });
  });
});








// Submit a review
app.post('/user/reviews', (req, res) => {
  const { comment, cust_id, productId } = req.body;

  if (!comment || !cust_id || !productId) {
    return res.status(400).json({ Success: false, error: 'Comment, Customer ID (cust_id), and Product ID (productId) are required.' });
  }

  const insertQuery = `
    INSERT INTO review (Product_id, cust_id, Comment)
    VALUES (?, ?, ?);
  `;
  
  db.query(insertQuery, [productId, cust_id, comment], (err, result) => {
    if (err) {
      console.error("Error submitting review:", err);
      return res.status(500).json({ Success: false, error: 'Error submitting review' });
    }

    res.json({ Success: true, message: 'Review submitted successfully' });
  });
});


// Get reviews for a product
app.post('/get/user/reviews', (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ Success: false, error: 'Product ID is required to fetch reviews.' });
  }

  const query = `
    SELECT 
      r.Comment, 
      r.review_date, 
      c.Cust_name AS user 
    FROM 
      review r
    JOIN 
      customer c ON r.cust_id = c.Cust_id
    WHERE 
      r.Product_id = ?
    ORDER BY 
      r.review_date DESC;
  `;

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ Success: false, error: 'Failed to fetch reviews from the database.' });
    }

    res.json({ Success: true, reviews: results });
  });
});






  // **Password Reset - Reset Password (with previous password verification)**
app.post('/reset-password', (req, res) => {
    try {
        const { email, previousPassword, newPassword } = req.body;

        // Fetch user from database
        const query = 'SELECT * FROM customer WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Success: false, error: "Database error." });
            }

            if (results.length === 0) {
                return res.status(400).json({ Success: false, errors: "User not found." });
            }

            const user = results[0];

            // Compare plain-text passwords
            if (user.password !== previousPassword) {
                return res.status(400).json({ Success: false, errors: "Previous password is incorrect." });
            }

            // Update password in the database
            const updateQuery = 'UPDATE customer SET password = ? WHERE email = ?';
            db.query(updateQuery, [newPassword, email], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ Success: false, error: "Database error." });
                }
                res.json({ Success: true, message: "Password reset successful." });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, error: "Server error." });
    }
});
// **Update Account**
app.post('/update-account', (req, res) => {
    try {
        const { email, newUsername, newPassword } = req.body;

        const query = 'SELECT * FROM customer WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Success: false, errors: "Database error." });
            }

            if (results.length === 0) {
                return res.status(400).json({ Success: false, errors: "User not found." });
            }

            const user = results[0];
            const updates = [];

            if (newUsername) updates.push({ field: 'Cust_name', value: newUsername });
            if (newPassword) updates.push({ field: 'password', value: newPassword });

            updates.forEach(update => {
                const updateQuery = `UPDATE customer SET ${update.field} = ? WHERE email = ?`;
                db.query(updateQuery, [update.value, email], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ Success: false, errors: "Database error." });
                    }
                });
            });

            res.json({ Success: true, message: "Account updated successfully." });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, errors: "Server error." });
    }
});




// **Delete Account**
app.post('/delete-account', (req, res) => {
    try {
        const { email } = req.body;

        console.log("Email received:", email);

        // Delete user from the database
        const query = 'DELETE FROM customer WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Success: false, errors: "Database error." });
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({ Success: false, errors: "User not found." });
            }

            res.json({ Success: true, message: "Account deleted successfully." });
        });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ Success: false, errors: "Server error.", details: error.message });
    }
});



        
// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.error("Error starting server:", error);
  }
});

