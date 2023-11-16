
//curl -X POST "https://tonavision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: bacb8dcfa5fb4745a8acd31076a951b1" --data-ascii "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"

async function analyzeImage(imageUrl, subscriptionKey) {
  const endpoint = 'https://tonavision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people';
  
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  };
  const body = JSON.stringify({
    url: imageUrl
  });
  console.log(body);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body
  });

  if (!response.ok) {
    throw new Error(`Sigue sin salir: ${response.status} ${response.statusText}`);
  }

  return response.json();
}



export default analyzeImage;