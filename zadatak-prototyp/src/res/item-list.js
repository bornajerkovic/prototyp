let ALL_ITEMS = [
  {
    id: 1,
    name: "Asus Laptop",
    category: "laptops",
    price: 3600,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 2,
    name: "Dell Laptop",
    category: "laptops",
    price: 5200,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 3,
    name: "Acer Laptop",
    category: "laptops",
    price: 3700,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 4,
    name: "Samasung Galaxy S8",
    category: "phones",
    price: 6600,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 5,
    name: "Samasung Galaxy S7",
    category: "phones",
    price: 5300,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 6,
    name: "iPhone 7S",
    category: "phones",
    price: 8200,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 7,
    name: "iPhone XR",
    category: "phones",
    price: 11000,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 8,
    name: "Amazon Kindle",
    category: "tablets",
    price: 2000,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 9,
    name: "Washing Machine",
    category: "home",
    price: 1600,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 10,
    name: "Coffee Machine",
    category: "home",
    price: 3150,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 11,
    name: "Ford Focus",
    category: "cars",
    price: 7000,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  },
  {
    id: 12,
    name: "Opel Astra",
    category: "cars",
    price: 7000,
    num: 1,
    inCart: false,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vivamus nec nunc dui. Donec tincidunt diam nunc, eget pharetra 
      risus convallis id. Fusce lobortis malesuada libero a egestas. 
      Mauris eu neque mi. Curabitur non quam vel orci euismod laoreet. 
      Orci varius natoque penatibus et magnis dis parturient montes, 
      nascetur ridiculus mus.`
  }
];

export default ALL_ITEMS;
