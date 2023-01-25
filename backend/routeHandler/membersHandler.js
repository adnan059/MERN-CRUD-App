const express = require("express");
const Member = require("../model/memberSchema");

const router = express.Router();

// register member
router.post("/register", async (req, res) => {
  const { name, email, age, phone, work, address, desc } = req.body;

  if (!name || !email || !age || !phone || !work || !address || !desc) {
    return res
      .status(422)
      .json({ message: "Please fill up all the fields of the form." });
  }

  try {
    const isAlreadyThere = await Member.findOne({ email: email, name: name });
    if (isAlreadyThere) {
      return res.status(422).json({ message: "This member already exists." });
    }

    const member = new Member({ name, email, age, phone, work, address, desc });

    const result = await member.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all the members
router.get("/getall", async (req, res) => {
  try {
    const allMembers = await Member.find();
    res.status(200).json(allMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update individual member
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete a member
router.delete("/delete/:id", async(req,res)=>{
  try {
    await Member.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Member deleted successfully."})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;
