const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product
      }
    })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

  // create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    { category_name: req.body.category_name },
    {
    where: {
      id: req.params.id,
    },
  })
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No category found with that ID.' });
    }
    res.status(200).json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No category found with that ID.' });
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
