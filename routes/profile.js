const express = require("express");
const router = express.Router();
const auth = require("../routes/verifyToken");
const Joi = require("joi");

const User = require("../Model/user");
const Profile = require("../Model/profile");

// @route 	GET api/profile/me
// @desc 	Get current users profile
// @access 	Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["firstname"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "User profile don't found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
});

// @route 	POST api/profile
// @desc 	Create or update user profile
// @access 	Private

// Validation
const schema = Joi.object({
  status: Joi.string().required(),
  skills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  location: Joi.string(),
  portfolio: Joi.string(),
  skills: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  bio: Joi.string(),
  githubusername: Joi.string(),
  experience: Joi.array(),
});

router.post("/", auth, async (req, res) => {
  // Check status and skill data
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //   Destructure all fields from body request
  const {
    location,
    portfolio,
    status,
    skills,
    bio,
    githubusername,
    experience,
    youtube,
    facebook,
    twitter,
    linkedin,
  } = req.body;

  // Build Profile Object
  const profileInputs = {};
  profileInputs.User = req.user.id;

  if (location) profileInputs.location = location;
  if (portfolio) profileInputs.portfolio = portfolio;
  if (status) profileInputs.status = status;
  if (bio) profileInputs.bio = bio;
  if (githubusername) profileInputs.githubusername = githubusername;
  if (experience) profileInputs.experience = experience;
  if (skills) profileInputs.skills = skills;
  //   Remove the space between skills in input field
  //   if (skills) {
  //     profileInputs.skills = skills.split(",").map((skill) => skill.trim());
  //   }

  //   Social object
  profileInputs.social = {};
  if (youtube) profileInputs.social.youtube = youtube;
  if (twitter) profileInputs.social.twitter = twitter;
  if (facebook) profileInputs.social.facebook = facebook;
  if (linkedin) profileInputs.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileInputs },
        { new: true }
      );

      return res.status(200).json(profile);
    }

    // Create
    profile = new Profile(profileInputs);

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route 	GET api/profile/
// @desc 	Get all profiles
// @access 	Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "firstname",
      "avatar",
    ]);
    res.json(profiles);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
