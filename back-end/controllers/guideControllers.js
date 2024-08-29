const Guide = require("../schemas/guideSchema");
const User = require("../schemas/usersSchema");
const { uploadImage, deleteImage } = require("../helpers/handleImageBuckets");
const { MongoClient } = require("mongodb");
async function createGuide(req, res) {
  try {
    const user = req.user;
    const guide = req.body;
    const imageFile = req.file;
    const imageUrl = await uploadImage("guideImages", imageFile);
    const territoryCoordinates = guide.territoryCoords
      .split(",")
      .map((coord) => Number(coord));
    const territoryCoords = {
      type: "Point",
      coordinates: territoryCoordinates,
    };

    const newGuide = new Guide({
      ...guide,
      territoryCoords,
      imageUrl,
      owner: user.id,
    });

    const savedGuide = await newGuide.save();
    if (!guide) throw error("Something went wrong the guide wasn't created");

    res.json(savedGuide._id.toString());
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
}
async function updateGuide(req, res) {
  try {
    const guide = req.guide;
    const newImage = req.file;

    req.body.territoryCoords = req.body.territoryCoords.split(",");

    if (req.file) {
      deleteImage("guideImages", guide.imageUrl);
      const newImageUrl = await uploadImage("guideImages", newImage);
      guide.set({ ...req.body, imageUrl: newImageUrl });
    } else guide.set(req.body);
    const updatedGuide = await guide.save();

    if (!updatedGuide)
      return res.status(500).json({ message: "Could not update guide" });

    res.status(201).json(updatedGuide);
  } catch (err) {
    res.json(err.message);
  }
}

async function deleteGuide(req, res) {
  try {
    const guideId = req.guide._id;

    const deletedGuide = await Guide.findByIdAndDelete(guideId);
    if (!deletedGuide)
      res.status(500).json({ message: "Guide couldnt be deleted" });

    await deleteImage("guideImages", req.guide.imageUrl);
    res.json({ message: "Guide Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getUserGuides(req, res) {
  const userId = req.params.userId;
  try {
    const userGuides = await Guide.find({ owner: userId });

    if (!userGuides)
      return res.status(404).json({ message: "Could not find guides" });
    res.json({ guides: userGuides });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getAllGuides(req, res) {
  try {
    const { page, perPage } = req.query;
    // const allGuides = await Guide.aggregateMostLiked(page, perPage);

    const client = await MongoClient.connect(process.env.MONGOURI);
    const db = client.db();

    const cursor = db.collection("guides").find({});
    const results = [];

    const userIds = new Set();
    for await (const result of cursor) {
      results.push(result);
      userIds.add(result.owner);
      (result.likes ?? []).forEach((like) => userIds.add(like));
      (result.comments ?? []).forEach((comment) =>
        userIds.add(comment.commenter)
      );
    }

    if (results.length == 0)
      return res
        .status(500)
        .json({ message: "Could not load guides, please try again later!" });
    const users = await User.find({ _id: { $in: Array.from(userIds) } });

    const numberOfPages =
      results.length % perPage > 0
        ? Math.floor(results.length / perPage) + 1
        : results.length / perPage;

    const userPerId = users.reduce((acc, cur) => {
      const { email, password, bookmarks, ...current } = cur.toObject();
      acc[cur._id] = current;
      return acc;
    }, {});
    const formattedGuides = results
      .map((result) => {
        result.owner = userPerId[result.owner];
        result.comments.forEach(
          (comment) => (comment.commenter = userPerId[comment.commenter])
        );
        return result;
      })
      .sort((a, b) => b.likes.length - a.likes.length)
      .splice((page - 1) * perPage, perPage);

    res.json({ guides: formattedGuides, numberOfPages });
  } catch (err) {
    res.json(err.message);
  }
}

async function getGuidesByQuery(req, res) {
  try {
    const { query, page, perPage } = req.query;

    const guidesQuery = await Guide.find({
      $or: [
        { territory: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    const numberOfPages =
      guidesQuery.length % perPage > 0
        ? Math.floor(guidesQuery.length / perPage) + 1
        : guidesQuery.length / perPage;

    const guides = guidesQuery.splice((page - 1) * perPage, perPage);

    if (!guides)
      res
        .status(500)
        .json({ message: "Could not load guides, please try again later!" });
    res.json({ guides, numberOfPages });
  } catch (err) {
    res.json(err.message);
  }
}
async function getNearbyGuides(req, res) {
  try {
    const { lat, lng, page, perPage } = req.query;

    const sortedByNearGuides = await Guide.aggregateNearestGuides(
      lat,
      lng,
      page,
      perPage
    );

    if (!sortedByNearGuides)
      res
        .status(500)
        .json({ message: "Could not load guides, please try again later!" });
    const numberOfGuides = await Guide.countDocuments();
    const numberOfPages =
      numberOfGuides % perPage > 0
        ? Math.floor(numberOfGuides / perPage) + 1
        : numberOfGuides / perPage;
    res.json({ guides: sortedByNearGuides, numberOfPages });
  } catch (err) {
    res.json(err.message);
  }
}

async function toggleLike(req, res) {
  try {
    const { user, guide } = req;
    const alreadyLiked = guide.likes.includes(user.id);
    if (alreadyLiked) {
      idIndex = guide.likes.findIndex((id) => id.toString() == user.id);
      guide.likes.splice(idIndex, 1);
    } else guide.likes.push(user.id);
    await guide.save();
    res.status(200).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error, could not add like on guide" });
  }
}

async function addComment(req, res) {
  try {
    const guide = req.guide;
    const { comment, commenter } = req.body;

    guide.comments.push({ comment, commenter });

    const newGuide = await guide.save();
    if (!newGuide)
      return res.status(500).json({ message: "Couldnt submit comment" });
    res.end();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error, couldnt submit comment" });
  }
}

async function editComment(req, res) {
  try {
    const guide = req.guide;
    const { commentId } = req.params;
    const userId = req.user.id;
    const commentToEdit = guide.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (commentToEdit.commenter._id.toString() !== userId)
      return res
        .status(401)
        .json({ message: "Unauthorized, cannot edit comment" });
    commentToEdit.comment = req.body.comment;

    const savedGuide = await guide.save();
    return res.json(savedGuide);
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error could not edit comment" });
  }
}
async function deleteComment(req, res) {
  try {
    const guide = req.guide;
    const { commentId } = req.params;
    const userId = req.user.id;
    const commentIndexToDelete = guide.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    const commentToDelete = guide.comments[commentIndexToDelete];
    if (commentToDelete.commenter._id.toString() !== userId)
      return res
        .status(401)
        .json({ message: "Unauthorized, cannot edit comment" });
    guide.comments.splice(commentIndexToDelete, 1);

    const savedGuide = await guide.save();
    return res.json(savedGuide);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "internal server error could not edit comment" });
  }
}
module.exports = {
  createGuide,
  updateGuide,
  getUserGuides,
  deleteGuide,
  getAllGuides,
  getGuidesByQuery,
  getNearbyGuides,
  toggleLike,
  addComment,
  editComment,
  deleteComment,
};
