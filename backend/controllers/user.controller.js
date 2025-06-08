import User from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
      .select("-password")
      .select("fullName profilePic lastOnline");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, username } = req.body;
    let updatedData = {};

    if (fullName) updatedData.fullName = fullName;
    if (username) updatedData.username = username;

    // If a file was uploaded (via multer with Cloudinary)
    if (req.file) {
      updatedData.profilePic = req.file.path; // multer + Cloudinary sets path
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
