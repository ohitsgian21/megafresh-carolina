/**
 * data.js — Mega Fresh Carolina
 * Global data store: store info, categories, and curated featured deals.
 * Products page uses novSpecials.json for the full specials list.
 */

window.storeInfo = {
  name: "Mega Fresh Carolina",
  tagline: "El Mejor Supermercado",
  address: "24 Calle Yunquecito, Carolina, PR 00987",
  phone: "+1 787-257-8050",
  email: "elmejorsupermercado1@gmail.com",
  hours: "Lun–Dom: 6:00 am – 9:00 pm"
};

window.categories = [
  {
    id: "congelados",
    name: "Sodas, Jugos y Congelados",
    description: "Selección completa de bebidas frías y productos congelados.",
    gif: "img/congelados.gif",
    filterKey: "Productos Congelados"
  },
  {
    id: "neveras",
    name: "Lácteos y Proteínas",
    description: "Leche, quesos, proteínas y más. Frescos del día, siempre.",
    gif: "img/neveras.gif",
    filterKey: "Lacteos y Derivados"
  },
  {
    id: "limpieza",
    name: "Artículos del Hogar",
    description: "Limpieza del hogar y variedad de productos esenciales.",
    gif: "img/limpieza.gif",
    filterKey: "Limpieza"
  },
  {
    id: "hygiene",
    name: "Higiene Personal",
    description: "Múltiples selecciones de productos de higiene personal.",
    gif: "img/hygiene.gif",
    filterKey: "Cuidado Personal"
  },
  {
    id: "grains",
    name: "Cereales, Galletas y Jugos",
    description: "Amplia variedad de cereales, galletas y jugos refrigerados.",
    gif: "img/grains.gif",
    filterKey: "Cereales, Arroz y Pasta"
  },
  {
    id: "auto",
    name: "Mantenimiento Automotriz",
    description: "Limpieza de autos con todo tipo de aceite lubricante.",
    gif: "img/auto.gif",
    filterKey: "Auto"
  }
];

/* Curated featured deals shown on home page and TV mode.
   Images: placeholder until real product photos are supplied. */
window.deals = [
  {
    id: 1,
    name: "Goya Gandules Verdes 15oz",
    category: "Productos Enlatados",
    price: "$1.50",
    badge: "OFERTA",
    cold: false,
    img: "img/product-1.jpg"
  },
  {
    id: 2,
    name: "Holsum Hot Dog 8ct",
    category: "Bakery",
    price: "$2.79",
    badge: "OFERTA",
    cold: false,
    img: "img/product-2.jpg"
  },
  {
    id: 3,
    name: "Agrosuper Alitas de Pollo 5lbs",
    category: "Productos Congelados",
    price: "$12.99",
    badge: "FRÍO",
    cold: true,
    img: "img/product-3.jpg"
  },
  {
    id: 4,
    name: "Goya Agua de Coco 11.8oz",
    category: "Jugos",
    price: "$1.25",
    badge: "OFERTA",
    cold: false,
    img: "img/product-4.jpg"
  },
  {
    id: 5,
    name: "Charmin Essentials Soft 6pk",
    category: "Cuidado Personal",
    price: "$6.15",
    badge: null,
    cold: false,
    img: "img/product-5.jpg"
  },
  {
    id: 6,
    name: "Senor Poderoso Cloro 62.5oz",
    category: "Limpieza",
    price: "$1.69",
    badge: "OFERTA",
    cold: false,
    img: "img/product-6.jpg"
  },
  {
    id: 7,
    name: "Mazola Canola Aceite 96oz",
    category: "Aceites",
    price: "$9.39",
    badge: null,
    cold: false,
    img: "img/product-7.jpg"
  },
  {
    id: 8,
    name: "AgroSuper Chicken Breast 2.2lbs",
    category: "Productos Congelados",
    price: "$9.69",
    badge: "FRÍO",
    cold: true,
    img: "img/product-8.jpg"
  }
];
