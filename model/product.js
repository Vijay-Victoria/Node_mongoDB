const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
      title: {type:String, required: true, unique:true},
      description:{type:String, required: true},
      category: {type:String, required: true},
      price: {type:String, required: true},
      discountPercentage: {type: Number, min:[0,'wrong discount'], max:[50,'wrong discount']},
      rating:{type: Number, min:[0,'wrong rating'], max:[5,'wrong rating']},
      brand:  {type:String, required: true},
      images: String,
  });

  exports.Product = mongoose.model('Products', productSchema);
