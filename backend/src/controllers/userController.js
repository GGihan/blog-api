import { prisma } from "../../lib/prisma.js";

export const getMe = async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User no longer exists.',
    });
  }
  
  res.json({
    success: true,
    user,
  });
};