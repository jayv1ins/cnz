const {PrismaClient, Prisma} = require("@prisma/client")
const prisma = new PrismaClient



exports.getIndex = async function(req, res) {
  res.render('/');
};