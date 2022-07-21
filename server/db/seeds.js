
const mongoose = require("mongoose");

const Product = require("../models/Product.model");

// this is the file were we establish connection with database
require("./index.js");

const products = [
    {
      image: [
      "https://res.cloudinary.com/dygxpwdnk/image/upload/v1656167048/little-posite-one-little-kids-shoes-MFQT9P_jya4re.jpg",

      ],
      name: "Nike posite one",
      details:
        "size: 1-8",
      price: 120,
    },

    {
      image: [
        "https://res.cloudinary.com/dygxpwdnk/image/upload/v1656167038/air-force-1-07-next-nature-shoes-Kwpn0q_a2nrsg.jpg",
        "https://res.cloudinary.com/dygxpwdnk/image/upload/v1658331553/https_3A_2F_2Fhypebeast.com_2Fimage_2F2022_2F04_2Fnike-air-force-1-low-snakeskin-dv1031-030-release-info-000_rhrdhw.jpg",
       "https://res.cloudinary.com/dygxpwdnk/image/upload/v1658331542/custom-nike-air-force-1-low-by-you-shoe_pn3ynz.jpg",
        "https://res.cloudinary.com/dygxpwdnk/image/upload/v1658331547/air-force-1-07-premium-mens-shoes-QRS4Fd_bk71dg.jpg",
      ],
      name: "Air force one's ",
      details:
        "size 6-12",
      price: 90,
    },

    {
      image: ["https://res.cloudinary.com/dygxpwdnk/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1656167029/jordan-melo-m12-555088_062_a_prem-e1575044740922_m0sver.jpg",
        "https://res.cloudinary.com/dygxpwdnk/image/upload/v1658331769/baskets-air-jordan-1-retro-high-university-blue-air-jordan-kikikickz-441388_1024x1024_jvl92c.jpg",
        "https://res.cloudinary.com/dygxpwdnk/image/upload/v1658331751/air-jordan-1-high-85-college-navy-bq4422-400-release-date_p5plbw.jpg",
       
      ],
      name: "jordan's one ",
      details:
        "size 6-10",
      price: 250,
    },


    {
      image: [
        "https://res.cloudinary.com/dro7gwdx3/image/upload/v1654465987/earphones_a_1_ftbism.webp",
       
      ],
      name: "boAt bassHeads 242",
      details:
        "Get ready to redefine fitness fashion and utility with the wired headphone boAt Bassheads 242, it’s time to get your sport on. It carries ear hooks that are crafted from silicon to maximize comfort and a secure fit that allows you to maximize your workouts. Coated with IPX 4 sweat and water protection, the Bassheads 242 emphasizes on all-around ability with 10mm drivers that reproduce a quality sound. Move around freely with the superior coated cable that reaches comfortably from your pocket till your ears. Connect to a number of devices with ease using the 3.5mm straight jack, because there’s no stress, only sweetness when you’re riding the waves on this boAt. You can tune in and out with the pause/play button that can also take calls (With In-line Mic.) and control volume in-between exercise reputations.",
      price: 34,
    },

    
    {
      image: [
        "https://res.cloudinary.com/dro7gwdx3/image/upload/v1654465989/watch_1_c3zkt7.webp",
       
      ],
      name: "Watch Blaze",
      details: `Whatever you need to hustle to your goal -- now do it Faster with Blaze. It's powered by Apollo 3 Blue Plus high-performance processor that makes its interface 25% faster. Navigate through your world effortlessly with its 1.75" HD display-- the largest by boAt. We understand your hustle, that's why its Fast Charge technology gives 24HRS of backup with just 10MINS of charge. Keep your fitness in check with heart rate and SpO2 monitoring, daily activity tracker, and 14 sport modes. Smart Watch Blaze -- for trailblazers like you`,
      price: 69,
    },
    {
      image: [
        "https://res.cloudinary.com/dro7gwdx3/image/upload/v1654465988/earphones_b_1_lyf3qq.webp",
       
      ],
      name: "boAt Airdopes 281 Pro",
      details:
        "Life seems better if the right music is heard the right way. Plug into a blissful listening experience with boAt Airdopes 281 Pro - a truly wireless earbuds powered by boAt Signature Sound. Equipped with ENx™ Technology and four mics, it makes your everyday calling experience hit the roof. Win matches while playing multiplayer games with your friends through its optimum noise cancellation and crystal-clear audio input. So, where are you? Because your perfect audio match is right here - boAt Airdopes 281.",
      price: 49,
    },
    {
      image: [
        "https://res.cloudinary.com/dygxpwdnk/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1656167014/kyrie-low-5-basketball-shoes-ZdZQfZ_sgnpjn.jpg",
        
      ],
      name: "kyrie low 5",
      details:
        "size: 4-12",
      price: 239,
    },

    {
      image: [
        "https://res.cloudinary.com/dygxpwdnk/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1656167021/revolution-5-mens-road-running-shoes-ZXqS6C_jzaxtd.jpg",
       
        
      ],
      name: "revolution 5 mens running shoes",
      details:
        "size: 7-12",
      price: 85,
    },
  ];
  
  Product.create(products)
    .then((productFromDB) => {
        
      // all went good
  
      productFromDB.forEach((oneProduct) => {
        console.log(oneProduct.name);
      });
  
      mongoose.connection.close();
    })
    .catch((err) => console.log(`Error while seeding the database: ${err}`)); // something bad happened



