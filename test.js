const newObject = {
    id: "",
    x: undefined,
    y: undefined
  };
  
  console.log(newObject);

  data =  {"id":"","x":2.4649999141693117,"y":-2.740000009536743};

  var temp = data;

  console.log(temp);

  newObject.id = "test"
  newObject.x = temp.x;
  newObject.y = temp.y;

  console.log(newObject);