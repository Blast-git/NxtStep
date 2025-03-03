const news = require("../models/news");

exports.createNews = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      publish_date,
      author,
      source_url,
      is_featured,
    } = req.body;

    if (
      !title ||
      !content ||
      !category ||
      !publish_date ||
      !author ||
      !source_url
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const news = await News.create({
      title,
      content,
      category,
      publish_date,
      author,
      source_url,
      is_featured: is_featured || false,
    });

    return res.status(201).json({
      success: true,
      message: "News article created successfully",
      news,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating news article" });
  }
};

const News = require("../models/news");

// Fetch all news with optional category filtering
exports.getAllNews = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) filter.category = category;

    const news = await News.find(filter).sort({ publish_date: -1 }); // Sort by newest first

    return res.status(200).json({
      success: true,
      total: news.length,
      news,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching news" });
  }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
  try {
    const { news_id } = req.params;

    const deletedNews = await News.findByIdAndDelete(news_id);

    if (!deletedNews) {
      return res
        .status(404)
        .json({ success: false, message: "News article not found" });
    }

    return res.status(200).json({
      success: true,
      message: "News article deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting news article" });
  }
};

// Fetch a single news article by ID
// exports.getNewsById = async (req, res) => {
//   try {
//     const { news_id } = req.params;
//     const news = await News.findById(news_id);

//     if (!news) {
//       return res
//         .status(404)
//         .json({ success: false, message: "News article not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       news,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error fetching news article" });
//   }
// };
