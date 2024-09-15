import express from "express";

const router = express.Router();

const dogOwners = [
  {id:1, firstName:"Leon", lastName:"Honeycutt", dogs:["Ginger","Zeus"]},
  {id:2, firstName:"Jane", lastName:"Doe", dogs:["Seth"]}];

router.get('/list', (req, res) => {
  res.status(200).send(dogOwners);
});

router.get('/:id', (req, res) => {
  //search dogOwners using the ID provided in the URL
  const ownerId = dogOwners.find(ownerId => ownerId.id === parseInt(req.params.id));
  if(!ownerId){res.status(400).send('The dog owner with the given ID was not found')};
  res.status(200).send(ownerId);
})

router.post('/add', (req,res) => {
  const dogOwner = req.body;
  if(!dogOwner.firstName|| !dogOwner.lastName || !dogOwner.dogs){res.status(400).send('Incomplete form')}
  else{
    dogOwner.id = dogOwners.length + 1;
    dogOwners.push(dogOwner);
    res.status(200).send("Dog owner successfully added");
  };
});

router.put('/update/:id', (req,res) => {
  const dogOwner = dogOwners.find(dogOwner => dogOwner.id === parseInt(req.params.id));
  if(!dogOwner){res.status(400).send("Owner not found")}
  else{
    const updatedDogOwner = {...dogOwner};
    if(!req.body.firstName) updatedDogOwner.firstName = req.body.firstName;
    if(!req.body.lastName) updatedDogOwner.lastName = req.body.lastName;
    if(req.body.dogs && dogOwner.dogs == ""){
      req.body.dogs.forEach(dog => {
        updatedDogOwner.dogs.push(dog);
      });
    }
    dogOwners[dogOwners.indexOf(dogOwner)] = updatedDogOwner;
    res.status(200).send("Dog owner successfully updated.");
  }
});

router.delete('/delete/:id', (req, res) => {
  const dogOwner = dogOwners.find(dogOwner => dogOwner.id === parseInt(req.params.id));
  if(!dogOwner){
    res.status(400).send("Dog Owner not Found");
  }else{
    dogOwners.splice(dogOwners.indexOf(dogOwner),1);
    res.status(200).send('Dog owner successfully deleted');
  }
})
export{router as dogOwnerRouter};