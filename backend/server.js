const sheets = require("./googlesheets");
const express = require("express");

const SPREADSHEET_ID = "1fkEce1S11ooQstWLbAhQ68_BqZdKHt4c6E4T17UKR8Y";
const PORT = 5000;

const app = express();

app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
require("dotenv").config();

const cors = require("cors")
const mongoose = require("mongoose")
app.use(express.json());
app.use(cors())
const { initializeApp, cert } = require("firebase-admin/app");

initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
});
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb Connected");
    app.listen(PORT, () => {
        console.log("Server running on port 3001");
    });
})
.catch((error)=>{
    console.log("Failed to connect with MongoDB",error);
    
})





const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
    },{
        timestamps : true
    }
)
const cartSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
  
    cartItems: [
      {
        id: String,
        
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  });
const wishlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    items: [
        {
            id: {
                type: String,
                required: true
            }
        }
    ]
});
const user = mongoose.model("Users",contactSchema)
const cartitem = mongoose.model("CartItems",cartSchema)
const wishlistitems = mongoose.model("Wishlist",wishlistSchema)
// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Jnapika Backend");
});

// Products Route
app.get("/products", (req, res) => {
    res.send("List of Products");
});




app.post("/order", async (req, res) => {
    try {
        const {
            customerName,
            name,
            email,
            phone,
            hostelAddress,
            address,
            product,
            quantity,
            selectedColor,
            customNotes,
            price,
            totalPrice,
            items
        } = req.body;

        const custName = customerName || name || "N/A";
        const custAddress = hostelAddress || address || "N/A";

        // Generate Date-based Sequential Order ID (e.g. JNP-20260731-001)
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }).replace(/-/g, "");
        const orderDate = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        let orderSeq = 1;
        try {
            const existingOrders = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: "Orders!A:M",
            });
            const rows = existingOrders.data.values || [];
            const prefix = `JNP-${dateStr}-`;
            let maxSeq = 0;
            rows.forEach(r => {
                if (r[0] && String(r[0]).startsWith(prefix)) {
                    const parts = String(r[0]).split("-");
                    const num = parseInt(parts[2], 10);
                    if (!isNaN(num) && num > maxSeq) {
                        maxSeq = num;
                    }
                }
            });
            orderSeq = maxSeq + 1;
        } catch (e) {
            console.error("Error fetching existing orders count:", e);
        }

        const orderId = `JNP-${dateStr}-${String(orderSeq).padStart(3, "0")}`;

        // Format phone number to avoid Google Sheets formula parse error (+91...)
        const rawPhone = phone ? String(phone).trim() : "N/A";
        const formattedPhone = rawPhone.startsWith("+") ? `'${rawPhone}` : rawPhone;

        const rowsToAppend = [];

        if (Array.isArray(items) && items.length > 0) {
            // Multi-item Cart Checkout - ALL products in the cart share ONE single order ID
            items.forEach(item => {
                const pName = item.product || item.name || "N/A";
                const pQty = item.quantity || 1;
                const pPrice = item.price || 0;
                const pTotal = item.totalPrice || (pPrice * pQty);
                const pColor = item.selectedColor || item.color || "Default";
                const pNotes = item.customNotes || customNotes || "None";

                rowsToAppend.push([
                    orderId,                        // A: ORDER ID
                    orderDate,                      // B: DATE & TIME
                    custName,                       // C: CUSTOMER NAME
                    formattedPhone,                 // D: PHONE
                    email || "N/A",                 // E: EMAIL
                    custAddress,                    // F: ADDRESS
                    pName,                          // G: PRODUCT
                    pColor,                         // H: VARIENT
                    pQty,                           // I: QUANTITY
                    pPrice ? `₹${pPrice}` : "N/A",  // J: UNIT PRICE
                    `₹${pTotal}`,                   // K: TOTAL PRICE
                    pNotes,                         // L: NOTES
                    "Pending"                       // M: STATUS
                ]);
            });
        } else {
            // Single Item Order
            const itemQuantity = quantity || 1;
            const itemPrice = price || 0;
            const finalTotal = totalPrice || (itemPrice * itemQuantity);

            rowsToAppend.push([
                orderId,                        // A: ORDER ID
                orderDate,                      // B: DATE & TIME
                custName,                       // C: CUSTOMER NAME
                formattedPhone,                 // D: PHONE
                email || "N/A",                 // E: EMAIL
                custAddress,                    // F: ADDRESS
                product || "N/A",               // G: PRODUCT
                selectedColor || "Default",     // H: VARIENT
                itemQuantity,                   // I: QUANTITY
                itemPrice ? `₹${itemPrice}` : "N/A", // J: UNIT PRICE
                `₹${finalTotal}`,               // K: TOTAL PRICE
                customNotes || "None",          // L: NOTES
                "Pending"                       // M: STATUS
            ]);
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Orders!A:M",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: rowsToAppend
            }
        });

        res.json({
            success: true,
            orderId: orderId,
            message: "Order saved successfully!"
        });

    } catch (error) {
        console.error("Error saving order to Google Sheets:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to save order"
        });
    }
});




app.post('/login',async(req,res)=>{
    const userlogin = req.body
    
    
    try{
        const newUser = await user.findOne({email : userlogin.email});
        if(!newUser){
            return res.status(500).json({
                status : 500,
                message : "User not found!"
            })
        }else{
            res.status(200).json({
                status : 200,
                message : "User found!",
                data : newUser
            })
        }
        
        console.log(newUser);
        
    }catch(error){
        console.log(error.message);
        
    }
})
app.post('/signup',async(req,res)=>{
    const usersignup = req.body
    
    
    try{
        const newu = await user.findOne({email : usersignup.email})
        if(!newu){
        const newUser = new user(usersignup);
        await newUser.save()
        console.log(newUser);
                
                res.status(200).json({status : 200,message : "Signup successfully!"})
        }
        else{
            res.status(500).json({status : 500,message : "Email already existed!"})
        }
        
    }catch(error){
        console.log(error.message);
        
    }
})
app.put('/updateProfile',async(req,res)=>{
    const userupdate = req.body
     try{
        const updatedUser = await user.findOneAndUpdate(
            {email : userupdate.email},{
                name : userupdate.name,
                phone : userupdate.phone
            },
            { returnDocument: 'after' }
        );
        if(!updatedUser){
            return res.status(404).json({
                success: false,
                message: "User not found",
              });
        }
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
          });
        
    }catch(error){
        console.error(error.message);
        res.status(500).json({
        success: false,
        message: "Server error",
        });
        
    }
    
})
app.post("/addItem", async (req, res) => {
    const { product, productuser } = req.body;

    const email = productuser;
    const quantity = Number(product.quantity) || 1;

    try {
        let cart = await cartitem.findOne({ email });

        if (!cart) {
            cart = new cartitem({
                email,
                cartItems: [
                    {
                        ...product,
                        quantity
                    }
                ]
            });

            await cart.save();

            return res.status(201).json({
                success: true,
                message: "Cart created successfully"
            });
        }

        const existingItem = cart.cartItems.find(
            (item) => item.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.cartItems.push({
                ...product,
                quantity: 1
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item added successfully"
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
app.delete("/removeItem", async (req, res) => {
    const { email, id } = req.body;

    try {
        const cart = await cartitem.findOne({ email });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.cartItems = cart.cartItems.filter(
            (item) => item.id !== id
        );

        await cart.save();
        
        res.status(200).json({
            success: true,
            message: "Item removed successfully",
            cartItems: cart.cartItems
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
app.get("/getCart", async (req, res) => {
    const { email } = req.query;

    try {
        const cart = await cartitem.findOne({ email });

        if (!cart) {
            return res.status(200).json({
                success: true,
                cartItems: []
            });
        }

        res.status(200).json({
            success: true,
            cartItems: cart.cartItems
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
app.get("/getWishList", async (req, res) => {
    const { email } = req.query;

    try {
        const wishlist = await wishlistitems.findOne({ email });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                items: []
            });
        }

        res.status(200).json({
            success: true,
            items: wishlist.items
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
app.put('/updateQuantity',async(req,res)=>{
    const {productId,productuser,newQty}=req.body
    
    try {
        
       
        
        const cart = await cartitem.findOne(
            {email : productuser},
            
            
        )
        
        if (!cart) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const item = cart.cartItems.find(
            (item) => item.id === productId
        );
        if (!item) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        item.quantity = newQty;
        await cart.save();

        res.status(200).json({
            message: "Quantity updated successfully",
            products: cart.cartItems
        });

        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
})
app.delete("/removecart", async (req, res) => {
    const { email } = req.body;

    try {
        await cartitem.findOneAndUpdate(
            { email },
            {
                $set: {
                    cartItems: []
                }
            }
        );

        res.status(200).json({
            message: "Cart cleared successfully",
            cartItems: []
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.post("/addwishlistItem", async (req, res) => {
    const { productId, useremail } = req.body;

    try {
        let wishlist = await wishlistitems.findOne({
            email: useremail
        });

        if (!wishlist) {
            wishlist = new wishlistitems({
                email: useremail,
                items: [
                    {
                        id: productId
                    }
                ]
            });

            await wishlist.save();

            return res.status(201).json({
                message: "Wishlist created successfully",
                items: wishlist.items
            });
        }

        const existingItem = wishlist.items.find(
            (item) => item.id === productId
        );

        if (existingItem) {
            return res.status(400).json({
                message: "Item already exists in wishlist"
            });
        }

        wishlist.items.push({ id: productId });

        await wishlist.save();

        res.status(200).json({
            message: "Item added successfully",
            items: wishlist.items
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.delete("/removewishlistItem",async(req,res)=>{
    const { productId, useremail } = req.body;
    try {
        const newItem = await wishlistitems.findOne({
            email : useremail
        })
        if(!newItem){
            return res.status(404).json({message : "Item not found!"})
        }
        newItem.items = newItem.items.filter(
            (item)=>item.id !== productId
        )
        await newItem.save()
        return res.status(200).json({message : "Item removed from wishlist!!",items : newItem.items})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})
