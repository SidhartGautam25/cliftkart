import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      default: "user",
    },
    cart: [{
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true

      },
      quantity: {
        type: String,
        default: "1",
        required: true
      }
    }],
    address: {
      type: [{
        pin: {
          type: "String",
          required: true,
          default: ""
        },
        other: {
          type: String,
          default: "",
          required: true
        }

      }],
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  console.log("you are at pre of user scema");
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.getJwtToken = function () {
  console.log("generating token");
  return jwt.sign({ id: this._id }, process.env.JWT_SEC_KEY, {
    expiresIn: process.env.JWT_EXP
  })
}

userSchema.methods.verifyPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
  // if(pass===this.password){
  //   return true;
  // }
  // return false;
};


userSchema.statics.getCartWithProducts = async function (userId) {
  return await this.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "products", // Collection name (usually lowercase and plural)
        localField: "cart.productId",
        foreignField: "_id",
        as: "cartProducts"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        cart: {
          $map: {
            input: "$cart",
            as: "cartItem",
            in: {
              $let: {
                vars: {
                  product: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$cartProducts",
                          cond: { $eq: ["$$this._id", "$$cartItem.productId"] }
                        }
                      },
                      0
                    ]
                  }
                },
                in: {
                  productId: "$$cartItem.productId",
                  quantity: "$$cartItem.quantity",
                  addedAt: "$$cartItem.addedAt",
                  product: {
                    _id: "$$product._id",
                    name: "$$product.name",
                    description: "$$product.description",
                    price: "$$product.price",
                    image: "$$product.image",
                    stock: "$$product.stock",
                    isActive: "$$product.isActive"
                  }
                }
              }
            }
          }
        }
      }
    }
  ]);
};




export default mongoose.model("User", userSchema);
