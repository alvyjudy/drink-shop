const products = () => (req, res, next) => {
  req.products = [
    {
      id: 1,
      name: "classic",
      price: 5,
      thumbnail: "1-thumbnail.png",
      mainPic: "1-main.png",
      sidePics: ["1-side-1.jpg", "1-side-2.jpg", "1-side-3.jpg"],
    },
    {
      id: 2,
      name: "original",
      price: 3,
      thumbnail: "2-thumbnail.png",
      mainPic: "2-main.png",
      sidePics: ["2-side-1.jpg", "2-side-2.jpg", "2-side-3.jpg"],
    },
    {
      id: 3,
      name: "garden",
      price: 4,
      thumbnail: "3-thumbnail.png",
      mainPic: "3-main.png",
      sidePics: ["3-side-1.jpg", "3-side-2.jpg", "3-side-3.jpg"],
    },
    {
      id: 4,
      name: "brown-sugar",
      price: 9,
      thumbnail: "4-thumbnail.png",
      mainPic: "4-main.png",
      sidePics: ["4-side-1.jpg", "4-side-2.jpg", "4-side-3.jpg"],
    },
    {
      id: 5,
      name: "oreo",
      price: 4,
      thumbnail: "5-thumbnail.png",
      mainPic: "5-main.png",
      sidePics: ["5-side-1.jpg", "5-side-2.jpg", "5-side-3.jpg"],
    },
    {
      id: 6,
      name: "passion-fruit",
      price: 4,
      thumbnail: "6-thumbnail.png",
      mainPic: "6-main.png",
      sidePics: ["6-side-1.jpg", "6-side-2.jpg", "6-side-3.jpg"],
    },
  ];
  next();
};

module.exports = { products };
