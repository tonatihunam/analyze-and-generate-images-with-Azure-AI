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