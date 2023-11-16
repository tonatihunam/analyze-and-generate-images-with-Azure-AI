import React from 'react';
import analyzeImage from './azure-image-analysis';
require('dotenv').config();

function App() {
  const [imageOrPrompt, setImageOrPrompt] = React.useState('https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const handleClick = React.useCallback(() => {
    setIsLoading(true);
    analyzeImage(imageOrPrompt, process.env.OCP_APIM_SUBSCRIPTION_KEYz)
      .then(data => {
        setResult(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  },[imageOrPrompt]);

  function DisplayResults(result) {
    if (result?.metadata?.height && result?.metadata?.width) {
      return (
        <>
          <h2>Computer Vision Analysis</h2>
          <img src={imageOrPrompt} alt="Processed" width={600} height={500}  />
          <p>Image size: {result.metadata.width} x {result.metadata.height}</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
         </>
      );
    } else {
      return (
        <>
          <p>Generated image:</p>
          <img src={result?.data?.url} alt="Generated" />
        </>
      );
    }
  }

  return (
    <>
      <h1>Computer vision</h1>
      <div className='prompt'>
        Insert URL or type prompt:
        <input 
          type="text" 
          name="imageOrPrompt"
          size="60"
          value={imageOrPrompt}
          onChange={(e) => setImageOrPrompt(e.target.value)}
          placeholder="Enter URL to analyze or textual prompt to generate image"
        />
      </div>
      <div className='controls'>
        <button onClick={handleClick}>Analyze</button> <button onClick={handleClick}>Generate</button>
      </div>
      {isLoading && <div className="processing">Processing...</div>}
      {result && DisplayResults(result)}
    </>
  );
}

export default App;