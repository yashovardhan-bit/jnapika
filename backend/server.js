const sheets = require("./googlesheets");
const express = require("express");

const SPREADSHEET_ID = "1YCdgNUIH8hkOGVqHsSecIzdDHytQBZKPDr37DPhmkAo";
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

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Jnapika Backend");
});

// Products Route
app.get("/products", (req, res) => {
    res.send("List of Products");
});

// Login Route
app.post("/login", (req, res) => {
    res.send("Login Successful");
});

// Order Route
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
                range: "Orders!A:A",
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});