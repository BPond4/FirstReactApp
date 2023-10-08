import express from "express";

const app = express();
const port = 8000;

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 

app.use(express.json());

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id); 
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const index = users['users_list'].findIndex(user => user['id'] === id);
    if (index == -1) {
        res.status(404).send('Resource not found.');
    } else {
        users['users_list'].splice(index, 1);
        res.status(204).send();
    }
    
});

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByJobAndName = (job, name) => {
    return (users['users_list']
        .filter((user) => user['job'] === job).filter((user)=> user['name'] === name));
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;
    if (name != undefined){
        if(job != undefined){
            result = findUserByJobAndName(job, name);
        }
        else{
            result = findUserByName(name);  
        }
        result = {users_list: result};
        res.send(result);
        
    }
    else{
        res.send(users);
    }
});



const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      