const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  const { id } = req.params;
  const todos = Todo.findById(id)
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  try {
  const todo = req.todo
  if(!todo) res.stats(405).send("todo not found");
  res.send(todo);
  } catch(error) {  
  res.status(500).send(error.message); 
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
    
  try { 
     const {text, done} = req.body;
     const updateTodo = await Todo.findByIdAndUpdate(
      req.todo.id,
      {text, done},
      {new: true}
    )
    if(!updateTodo) return res.statusCode(404)
    res.send(updateTodo);
  }catch(error) {
    res.statusCode(500)
 }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
