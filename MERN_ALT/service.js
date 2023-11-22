const { HfInference } = require("@huggingface/inference");

const HF_ACCESS_TOKEN = "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";

const inference = new HfInference(HF_ACCESS_TOKEN);

async function getAltTextReference(url) {
  const response = await fetch(url);
  const data = await response.blob();
  
  const altText = await inference.imageToText({
    data: data,
    model: "Sof22/image-caption-large-copy",
  });

  return altText;
}

module.exports = {
  getAltTextReference,
};
