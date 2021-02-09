const products = () => (req, res, next) => {
  req.products = [
    {
      id: 1,
      name: "classic",
      price: 5,
      thumbnail: "classic-thumbnail.jpg",
      mainPic: "1-main.jpg",
      sidePics: ["1-side-1.jpg", "1-side-2.jpg", "1-side-3.jpg"],
    },
    {
      id: 2,
      name: "original",
      price: 3,
      thumbnail: "2-thumbnail.jpg",
      mainPic: "2-main.jpg",
      sidePics: ["2-side-1.jpg", "2-side-2.jpg", "2-side-3.jpg"],
    },
    {
      id: 3,
      name: "garden",
      price: 4,
      thumbnail: "3-thumbnail.jpg",
      mainPic: "3-main.jpg",
      sidePics: ["3-side-1.jpg", "3-side-2.jpg", "3-side-3.jpg"],
    },
    {
      id: 4,
      name: "brown-sugar",
      price: 9,
      thumbnail: "4-thumbnail.jpg",
      mainPic: "4-main.jpg",
      sidePics: ["4-side-1.jpg", "4-side-2.jpg", "4-side-3.jpg"],
    },
    {
      id: 5,
      name: "oreo",
      price: 4,
      thumbnail: "5-thumbnail.jpg",
      mainPic: "5-main.jpg",
      sidePics: ["5-side-1.jpg", "5-side-2.jpg", "5-side-3.jpg"],
    },
    {
      id: 6,
      name: "passion-fruit",
      price: 4,
      thumbnail: "6-thumbnail.jpg",
      mainPic: "6-main.jpg",
      sidePics: ["6-side-1.jpg", "6-side-2.jpg", "6-side-3.jpg"],
    },
  ];
  next();
};

module.exports = { products };
