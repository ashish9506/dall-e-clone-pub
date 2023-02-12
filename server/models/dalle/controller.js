import config from "config";
import { Configuration, OpenAIApi } from "openai";
import _ from "lodash";

const configuration = new Configuration({
  apiKey: config.get("openaiKey"),
});

const openai = new OpenAIApi(configuration);

export default {
  async getImage(req, res, next) {
    const { prompt } = req.body;

    let openaiRes;
    try {
      openaiRes = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });
    } catch (error) {
      return res.status(500).send(error?.response.data.error.message);
    }

    const image = _.get(openaiRes, "data.data[0].b64_json");

    res.status(200).json({ photo: image });
  },
};
