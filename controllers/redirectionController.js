"use strict";

var geoip = require("geoip-country");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// REDIRECT user to longLink
exports.redirectToLink = async (req, res) => {
  try {
    const { urlCode } = req.params;

    let browser = req.headers["user-agent"];
    let device = req.device.type.toUpperCase();
    let ip = req.ip;
    let country = geoip.lookup("41.202.219.255").country;
    console.log(country);
    const existingLink = await prisma.link.findUnique({
      where: {
        urlCode,
      },
    });

    if (existingLink) {
      const newLink = await prisma.redirect.create({
        data: {
          ip,
          device,
          country,
          browser,
        },
      });
      return res.redirect(existingLink.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};
