import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: "Email is required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ message: "User not found", status: false });
    } else {
      return res.json({ message: "User found", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    if (!email) {
      return res.send("Email is requited");
    } else if (!name) {
      return res.send("Name is requited");
    } else if (!profilePicture) {
      return res.send("ProfilePicture is requited");
    }
    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: { email, name, about, profilePicture },
    });
    return res.json({ message: "Success", status: true });
  } catch (err) {
    next(err);
  }
};
