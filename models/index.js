// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreginKey: 'product_id',
  },
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreginKey: 'tag_id',
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
