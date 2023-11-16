
async function generateImage(apiKey, prompt, model, responseFormat, imageWidth, imageHeight) {
    const apiUrl = 'https://api.openai.com/v1/images/generations';

    const requestBody = {
        model: model,
        prompt: prompt,
        response_format: responseFormat,
        size: `${imageWidth}x${imageHeight}`,
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    return responseData.data[0].url;
}

export default generateImage;
