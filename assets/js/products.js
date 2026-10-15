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
    desc:"Glass nesting coffee table." }
];
