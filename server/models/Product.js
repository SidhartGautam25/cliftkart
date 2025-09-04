import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true,
    unique:true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [7, "Price cannot exceed 7 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  category:{
    type:String,
    default:"0"
  },
  subcat:{
     type:String,
     default:"",
  },
  tags: [
    {
      type: String,
    },
  ],
  discount: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [5, "Price cannot exceed 5 digits"],
    default: 100,
  },
  colors: [{
    type:String,
    default:""
  }
],
  size:[
    {
      type:String,
      default:""
    }
  ],
  quant1:[
    {
      type:String,
      default:""
    }
  ],
  quant2:[{
    type:String,
    default:""
  }],
  image:[{
    type:String,
    default:""
  },]
});

export default mongoose.model("Product", productSchema);
