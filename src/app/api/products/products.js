export default function handler(req, res) {
    const products = [
      { id: 1, name: "Coffee", price: 50, imageUrl: "/images/coffee.jpg" },
      { id: 2, name: "Tea", price: 40, imageUrl: "/images/tea.jpg" },
      { id: 3, name: "Cake", price: 100, imageUrl: "/images/cake.jpg" },
    ];
    
    res.status(200).json(products);
  }
  