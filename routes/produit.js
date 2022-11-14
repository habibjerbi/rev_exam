var express = require('express');
const Produit = require('../model/Produit');


var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('produit', { title: 'Express' });
});

module.exports = router;

/* GET home page. */
router.get('/listproduit', async function(req, res, next) {
  const produits = await Produit.find();
  res.render("listproduit", { produits });
  console.log(produits);
});

router.post("/addProduit", async function (req, res, next) {
  const { libelle, prix,description,quantite,instock } = req.body;
  console.log(libelle, prix,description,quantite,instock);
  const checkIfProduitExist = await Produit.findOne({ libelle });
  if (checkIfProduitExist) {
    return res.status(400).json({ message: "produit exist" });
  }
    try {
    const produit = new Produit({ libelle:libelle, prix:prix ,description:description,quantite:quantite,instock:instock });
    await produit.save();
    console.log('produit')
    res.redirect('/produits/listproduit');
  } catch (error) {
    res.json(error.message);
  }
});

/*------------------deletpro----------------*/
router.get("/deleteProduit/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    await Produit.findOneAndDelete({ _id: id });
    res.redirect("http://localhost:3000/produits/listproduit");
  } catch (error) {
    res.json(error.message);
  }
});

router.put("/modifyProduitPostman/:produitId", async function (req, res, next) {
  try{
    const { produitId } = req.params;
    const { libelle, prix, description,quantite,stock } = req.body;
    const checkIfUserExist = await Produit.findById(produitId);
    if (!checkIfUserExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const produit = await produit.findByIdAndUpdate(produitId, { libelle, prix, description,quantite,stock });
    res.status(200).json(user);

  }catch (e){
    res.status(500).json({ message: e.message });
  }
  });
  router.get('/notif', async function(req, res, next){
    res.render("notification")
  })





module.exports = router;
