const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
      ]
    });
    res.json(tagData);

  } catch (err) {
res.status(500).json(err);
  }
});


// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {

  try {
    const data = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
          {
            model: Product,
          }
      ]
    });

    res.json(data);
    
  } catch(err) {
    console.log(err);
    res.json(err);
  }
});


// create a new tag
router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }

});


// update a tag's name by its `id` value
  router.put('/:id', (req, res) => {

    Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id:req.params.id
        }
      });

      res.json(tagData);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});


module.exports = router;
