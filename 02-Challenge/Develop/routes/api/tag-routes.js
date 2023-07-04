const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.json(tagData);

  } catch (err) {
res.status(500).json(err);
  }
});


// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
try {
const tagData = await Tag.findByPk(req.params.id, {
  include:[
    {
      model: Tag,
      through: id,
      as: 'tag_name'
    }
  ]
})
}catch (err){
  res.status(500).json(err);
}
});


// create a new tag
router.post('/', (req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.json(tagData);

  } catch (err) {
    res.status(400)json(err);
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
router.delete('/:id', (req, res) => {
    try {
const tagData = await Tag.destroy({
    where: {
    id:req.params.id
  }
});

res.json(tagData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
