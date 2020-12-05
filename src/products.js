const products = () => (req, res, next) => {
  req.products = [
    {id:1, name: "classic", price: 5,
      thumbnail: "classic-thumbnail.jpg",
      mainPic:"classic-main.jpg",
      sidePics:["classic-side-1.jpg","classic-side-2.jpg","classic-side-3.jpg"]
    },
    {id:2, name: "original", price: 3,
      thumbnail: "original-thumbnail.jpg",
      mainPic:"original-main.jpg",
      sidePics:["original-side-1.jpg","original-side-2.jpg","original-side-3.jpg"]
    },
    {id:3, name: "garden", price: 4,
      thumbnail: "garden-thumbnail.jpg",
      mainPic:"garden-main.jpg",
      sidePics:["garden-side-1.jpg","garden-side-2.jpg","garden-side-3.jpg"]
    },
    {id:4, name:"brown-sugar", price: 9,
      thumbnail:"brown-sugar-thumbnail.jpg",
      mainPic:"brown-sugar-main.jpg",
      sidePics:["brown-sugar-side-1.jpg","brown-sugar-side-2.jpg","brown-sugar-side-3.jpg"]
  
    },
    {id:5, name: "oreo", price: 4,
    thumbnail: "oreo-thumbnail.jpg",
    mainPic:"oreo-main.jpg",
    sidePics:["oreo-side-1.jpg","oreo-side-2.jpg","oreo-side-3.jpg"]
  },
  {id:6, name: "passion-fruit", price: 4,
  thumbnail: "passion-fruit-thumbnail.jpg",
  mainPic:"passion-fruit-main.jpg",
  sidePics:["passion-fruit-side-1.jpg","passion-fruit-side-2.jpg","passion-fruit-side-3.jpg"]
},


  ]
  next()
}

module.exports = {products}