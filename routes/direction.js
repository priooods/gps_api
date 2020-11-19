const { User } = require("../model/user");
const router = require("express").Router();

// Method Add new data user
router.post("/user", (req, res, next) => {
  const user = new User({
    nama: req.body.nama,
    poslat: req.body.poslat,
    poslng: req.body.poslng,
    deslat: req.body.deslat,
    deslng: req.body.deslng,
    tujuan: req.body.tujuan
  });

  try {
    user.save();
    res.send(user);
  } catch (err) {
    res.status(200).send({ value: 0, pesan: "Gagal menyimpan pengguna baru" });
  }
});

//search All User
router.get("/finduser", (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs.length >= 1) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({
          pesan: "user not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ value: 0, pesan: err });
    });
});

//Updating data User by name
router.post("/updateuser/:nama", (req, res) => {
  const nama = req.params.nama;
  User.update({nama: nama},{ $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({value: 1, result});
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ value: 0, error: err });
    });
}); 

//Delete data User by name
router.delete("/deleteuser/:nama", (req, res, next) => {
  const nama = req.params.nama;
  User.deleteOne({ nama: nama })
    .exec()
    .then((result) => {
      res.status(200).json({value: 1, result});
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ pesan: "Delete gagal" });
    });
});

// // Find user by Name
router.get("/getuser/:nama", (req, res, next) => {
  const nama = req.params.nama;
  User.find({ nama: nama })
    .exec()
    .then((docs) => {
      res.status(200).json({ value: 1, docs});
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ value: 0, error: err });
    });
});

//Login user
router.post("/login", (req,res) => {
  const nama = req.body.nama;
  User.findOne({ nama: nama }, function (err, user) {
    if (err) {
      return res.status(200).json('Jaringan kamu jelek')
    }

    if (!user) {
      return res.status(200).send({ succes: 0, pesan: 'Kamu Siapa Sih ?' })
    }

    res.status(200).send({ succes: 1, pesan: nama });

  })
})

module.exports = router;