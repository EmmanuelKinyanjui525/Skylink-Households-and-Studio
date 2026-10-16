/* ============================================================
   SKYLINK HOUSEHOLDS — PRODUCT LIST
   To add a product, copy one block below, paste it at the end
   (add a comma after the previous block) and change the details.
   No other file needs to change.

   page:  which Households page it appears on:
          "kitchen-appliances" | "kitchenware-dining" | "home-essentials"
   price: a number in KSh, or null to show "Ask for price"
   img:   optional photo, e.g. "assets/img/my-product.jpg"
          (leave it out and a neat icon tile is shown instead)
   icon:  i-washer, i-pcooker, i-flask2, i-stove, i-table, i-pan,
          i-plates, i-kettle
   ============================================================ */
window.SKYLINK_PRODUCTS = [
  { id:"washing-machine", name:"9KG Single-Tub Washing Machine", category:"Washing Machines",
    page:"home-essentials", price:16000, icon:"i-washer",
    desc:"9KG single-tub washing machine." },

  { id:"pressure-cooker", name:"Ramtons RM782 8L Pressure Cooker", category:"Pressure Cookers",
    page:"kitchen-appliances", price:14000, icon:"i-pcooker",
    desc:"Ramtons RM782, 8-litre pressure cooker." },

  { id:"flask", name:"Feenik 2L Flask", category:"Flasks",
    page:"kitchenware-dining", price:3550, icon:"i-flask2",
    desc:"Feenik 2-litre flask." },

  { id:"nunix-cooker", name:"Nunix Cooker", category:"Cookers",
    page:"kitchen-appliances", price:null, icon:"i-stove",
    desc:"Nunix cookers. Ask us for the models and prices." },

  { id:"coffee-table", name:"Glass Nesting Coffee Table", category:"Home Essentials",
    page:"home-essentials", price:6500, icon:"i-table",
    desc:"Glass nesting coffee table." },

  /* ---- Products with photos ---- */
  { id:"cookware-set", name:"14-Piece Cookware Set", category:"Cookware & Utensils",
    page:"kitchenware-dining", price:null, img:"assets/img/products/cookware-set.jpg", pos:"50% 50%",
    desc:"14-piece cookware set with casseroles and lids, a frying pan and cooking tools." },

  { id:"saral-pressure-cooker", name:"Saral Pressure Cooker", category:"Pressure Cookers",
    page:"kitchen-appliances", price:null, img:"assets/img/products/saral-pressure-cooker.jpg", pos:"50% 50%",
    desc:"Saral pressure cooker with a locking lid and side handle." },

  { id:"ailyons-pressure-cooker", name:"Ailyons Electric Pressure Cooker", category:"Pressure Cookers",
    page:"kitchen-appliances", price:null, img:"assets/img/products/ailyons-pressure-cooker.jpg", pos:"50% 45%",
    desc:"Multifunction electric pressure cooker with digital controls: rice, soup, stew, steam, bake, porridge and more." },

  { id:"nice-one-food-flask", name:"Nice One 5.8L Food Flask", category:"Flasks",
    page:"kitchenware-dining", price:null, img:"assets/img/products/nice-one-food-flask.jpg", pos:"50% 30%",
    desc:"5.8L hot and cold food flask with a portable tap, carry handle and PU foam insulation." },

  { id:"kitchen-scale-sf400", name:"SF-400 Electronic Kitchen Scale", category:"Kitchen Appliances",
    page:"kitchen-appliances", price:null, img:"assets/img/products/kitchen-scale-sf400.jpg", pos:"50% 50%",
    desc:"Digital kitchen scale, 10,000g capacity in 1g steps." },

  { id:"plates-set", name:"Dinner Plates (Marble Print & White)", category:"Dining & Tableware",
    page:"kitchenware-dining", price:null, img:"assets/img/products/plates-set.jpg", pos:"50% 55%",
    desc:"Dinner plates in a black-and-white marble print and plain white, shown on gold stands." },

  { id:"oil-vinegar-bottle", name:"Oil & Vinegar Bottle", category:"Dining & Tableware",
    page:"kitchenware-dining", price:null, img:"assets/img/products/oil-vinegar-bottle.jpg", pos:"50% 50%",
    desc:"Glass oil and vinegar bottle with a black marble and gold design and a pourer spout." },

  { id:"roch-electric-kettle", name:"Roch 2.0L Electric Kettle", category:"Kitchen Appliances",
    page:"kitchen-appliances", price:null, img:"assets/img/products/roch-kettle.jpg", pos:"50% 35%",
    desc:"Roch electric kettle (REK-815-E), 2.0L, 1500 watt, with automatic shut-off and boil-dry protection." },

  { id:"knife-set", name:"Kitchen Knife Set with Rotating Stand", category:"Cookware & Utensils",
    page:"kitchenware-dining", price:null, img:"assets/img/products/knife-set.jpg", pos:"50% 50%",
    desc:"Knife set with kitchen scissors and a sharpener on a rotating stand." }
];
