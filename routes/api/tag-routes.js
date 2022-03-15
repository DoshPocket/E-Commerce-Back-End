const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll(
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

router.get('/:id', (req, res) => {
  Tag.findOne({
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

  // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    { tag_name: req.body.tag_name },
    {
    where: {
      id: req.params.id,
    },
  })
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with that ID.' });
    }
    res.status(200).json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with that ID.' });
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
