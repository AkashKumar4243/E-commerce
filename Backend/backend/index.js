import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import cors from "cors";
import path from "path";

const PORT = 4000;
const app = express();

//Database connection
const DB_CONNECT = "mongodb://localhost:27017/E-commerce";
mongoose.connect(DB_CONNECT, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());

//image storage  , storage configuration
const Storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: Storage });

app.use("/images", express.static("./upload/images"));

//save & upload the images

app.post("/upload", upload.single("Product"), (req, res) => {
  res.json({
    Status: 200,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

//Product Schema

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Add Product API

app.post("/addProduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    // let last_product = products.slice(-1);
    // //id = last_product.id + 1 ;                  i
    id = products.length + 1;
  } else {
    id = 1;
  }
  //console.log(last_product.id);

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log("Saved", product);
  await product.save(); // saving product in database
  res.json({
    success: true,
    name: req.body.name,
  });
});

// creatin endpoint for removing item
app.post("/removeProduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating endpoint to get all product
app.get("/allProduct", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products fetched");
  res.send(products);
});

// User schema for user's registration

const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  CartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// API for registration

app.post("/signUp", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });

  if (check) {
    return res.json({ success: false, errors: "email already registered" });
  }

  let Cart = {};
  for (let i = 0; i < 300; i++) {
    Cart[i] = 0;
  }

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    CartData: Cart,
  });

  await user.save(); //user data save in database

  //JWT AUTH
  const data = {
    user: {
      id: user.id,
    },
  };
  // console.log(data);

  const token = jwt.sign(data, "Secret_ecom");
  res.json({ success: true, token: token });
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (!user) {
    return res.json({
      success: false,
      error: "Username or Password is incorrect",
    });
  }

  const passCompare = req.body.password === user.password;
  if (passCompare) {
    const data = {
      user: {
        id: req.id,
      },
    };
    const token = jwt.sign(data, "Secret_ecom");
    res.json({
      success: true,
      token: token,
    });
  } else {
    res.json({
      success: false,
      error: "Password is incorrect",
    });
  }
});

// API for new collection

app.get("/newCollection", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(0, 6);
  console.log(newCollection);
  res.send(newCollection);
});

// API for popular in women

app.get("/popularInWomen", async (req, res) => {
  let products = await Product.find({});
  let popular = products.slice(0, 3);
  console.log(popular);
  res.send(popular);
});

// MiddleWare

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.json({
      success: false,
      error: "please login first...",
    });
  } else {
    try {
      // const data = jwt.verify(token, "Secret_ecom");
      // req.user = data.user;
      next();
    } catch (error) {
      res.send("Authentication Failed");
      alert("Please Authenticate first..");
    }
  }
};

// Cart Api

app.post("/addToCart", fetchUser, async (req, res) => {
  const authToken = req.headers["auth-token"];
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjYzU3NzU1ODI1MjAwNmQ4Njg2MWM0In0sImlhdCI6MTcwNzg5MDU0OX0.hDvF1F6fGrSKP8-4d76pLq2dVFdP4ahEbfRwaj-jUO4"
  const data = jwt.verify(token, "Secret_ecom");
  // req.user = data.user;
  console.log(authToken);
});
// app.post("/addToCart", fetchUser, async (req, res) => {
//   console.log(req.body, req.user);
//   console.log("item id : ", req.body.itemId);

//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );
//   res.send("Added");
// });

app.post("/removeFromCart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  console.log("item id : ", req.body.itemId);

  let userData = await Users.findOne({ id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed");
  }
});

// API to display cart items

// app.post("/getCart", fetchUser, async (req, res) => {
//   // console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);
// });
// app.get("/", (req, res) => {
//   res.send("Express app is running");
// });

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
