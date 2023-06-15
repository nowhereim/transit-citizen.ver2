const ImageServices = require("../services/imageServices");
const logger = require("../../utils/logger");
class imageControllers {
  constructor() {
    this.imageServices = new ImageServices();
  }

  uploadchatImage = async (req, res) => {
    try {
      const chatImage = req.file;
      const uploadchatImage = await this.imageServices.uploadchatImage(
        chatImage,
      );
      if (uploadchatImage.error)
        return res.status(400).send({ uploadchatImage });
      res.status(200).send({ url: uploadchatImage });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = imageControllers;
