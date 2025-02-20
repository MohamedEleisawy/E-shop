const mongoose = require("mongoose")

const ArticleSchema = mongoose.Schema(
  {
    name: { type: String, required: false, unique: false},
    content: { type: String, required: true}, 
    category: { type: String, required: true},
    brand: { type: String, required: true},
    price: { type: Number, required: true},
    // User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    avis: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Avis'}
    ],
    picture: {
      img:  { type: String, required: false},
      img1: { type: String},
      img2: { type: String},
      img3: { type: String},
      img4: { type: String},
    }, 
    status: { type: Boolean, required: false},
    stock: { type: Number, required: true}
  },
  {
    timestamps: { createdAt: true }
  }
)
module.exports = mongoose.model('Article', ArticleSchema)