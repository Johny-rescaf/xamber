"use strict";

const validUrl = require("valid-url");
const shortid = require("shortid");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// GET all link
exports.getLinks = async (req, res) => {
  let { limit } = req.query;
  try {
    const links = await prisma.link.findMany({
      take: limit || 10,
    });
    res.json(links);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
};


// GET single link
exports.getSingleLink = async (req, res) => {
  let { urlCode } = req.params;
  try {
    const link = await prisma.link.findUnique({
      where: {
        urlCode,
      },
    });
    if (link) {
      res.json(link);
    } else {
      res.send("Sorry Link does not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
};


// Add Link (Generate URL short code)
exports.addLink = async (req, res) => {
  const { longUrl } = req.body;

  // check the base url if its valid
  if (!validUrl.isUri(process.env.BASE_URL)) {
    return res.status(401).json("Invalid base URL");
  }

  // if we have a valid url, we create the url code
  const urlCode = shortid.generate();

  // check if long url if valid
  if (validUrl.isUri(longUrl)) {
    try {
      const existingLink = await prisma.link.findUnique({
        where: {
          longUrl: longUrl,
        },
      });

      // url exist and return the respose
      if (existingLink) {
        res.json(existingLink);
      } else {
        // join the generated short code and the the base url
        const shortUrl = process.env.BASE_URL + "/" + urlCode;
        console.log(shortUrl);
        const newLink = await prisma.link.create({
          data: {
            urlCode,
            longUrl,
            shortUrl,
          },
        });
        res.json(newLink);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
};


// UPDATE Link if exists
exports.updateLink = async (req, res) => {
  try {
    const { urlCode } = req.params;
    const { longUrl } = req.body;
    let query = {};
    // check the base url if its valid
    if (!validUrl.isUri(process.env.BASE_URL)) {
      return res.status(401).json("Invalid base URL");
    }

    if (longUrl) {
      // check if long url if valid
      if (validUrl.isUri(longUrl)) {
        query["longUrl"] = longUrl;
      }
    }

    const existingLink = await prisma.link.findUnique({
      where: {
        urlCode,
      },
    });

    // url exist and return the respose
    if (existingLink) {
      const updateLink = await prisma.link.update({
        where: {
          urlCode,
        },
        data: {
          ...query,
        },
      });
      res.json(updateLink);
    } else {
      res.send("Sorry Link does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
};


// DELETE Link if exists
exports.deleteLink = async (req, res) => {
  try {
    const { urlCode } = req.params;

    const existingLink = await prisma.link.findUnique({
      where: {
        urlCode,
      },
    });

    // url exist and delete the link
    if (existingLink) {
      const deletedUser = await prisma.link.delete({
        where: {
          urlCode,
        },
      });
      if (deletedUser) {
        res.json(deletedUser);
      }else{
          res.send("Could not delete link")
      }
    } else {
      res.send("Sorry Link does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
};
