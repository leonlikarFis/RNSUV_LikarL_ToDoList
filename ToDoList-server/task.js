var express = require('express')
var router = express.Router();

const tasks = [
  {idNumber: 1, name: 'Take out thrash', typeOfTask: 1, description: 'daosdaojsd', finished: false },
  {idNumber: 2, name: 'Vacum floor', typeOfTask: 1, description: 'daosdaojsd', finished: false },  
  {idNumber: 3, name: 'Homework', typeOfTask: 2, description: 'daosdaojsd',finished: false },
  {idNumber: 4, name: 'Project for school', description: 'daosdaojsd',typeOfTask: 2, finished: true },
  {idNumber: 5, name: 'Walk with dog', description: 'daosdaojsd',typeOfTask: 3, finished: false },];

const types = [
  { id: 1, name: 'Home' },
  { id: 2, name: 'School' },
  { id: 3, name: 'Pet' }
]

router.get('/types', (req, res) => {
  if (types) {
    return res.status(200).json(types);
  }
  return res.status(400).json({ msg: 'No types error.' });
});

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundTasks = tasks.filter(
      (task) => task.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundTasks);
  }
  return res.status(200).json(tasks);
});

router.get('/:tcode', (req, res) => {
  let typeCode = req.params.pcode;
  let foundTasks = tasks.filter(each => each.typeOfTask == typeCode);
  if (foundTasks) {
    return res.status(200).json(foundTasks);
  }
  return res.status(400).json({msg: 'Unknown error.'});
});

router.post('/', (req, res) => {
  let task = req.body;
  let foundTasks = tasks.find(each => each.idNumber == task.idNumber);
  if (foundTasks) {
    return res.status(400)
        .json({msg: 'Task with ID ' + task.idNumber + ' already exists!'});
  }
  tasks.push(task);
  return res.status(200).json({msg: 'Task with ID ' + task.idNumber + ' is successfully made!'});
});

router.patch('/:code', (req, res) => {
  let taskCode = req.params.code;
  let foundTasks = tasks.find(each => each.idNumber == taskCode);
  if (foundTasks) {
    foundTasks.finished = !foundTasks.finished;
    let msg = 'Task with ID ' + taskCode + ' is ';
    msg += foundTasks.finished ? ' finished.' : ' now finished.';
    return res.status(200).json({msg: msg});
  }
  return res.status(400).json({msg: 'Task with ID ' + taskCode + ' not found!'});
});

module.exports = router;
