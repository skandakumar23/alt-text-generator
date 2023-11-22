import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setalText] = useState('');
  const [imageData, setImageData] = useState(null);

  const handleURLInputChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
  };

  // const handleDisplayImage = async () => {
  //   try {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     setImageData(URL.createObjectURL(blob));
  //   } catch (error) {
  //     console.error('Error fetching image:', error);
  //   }
  // };
  const handleDisplayImage = async () => {
    try {
      if (!imageUrl) {
        throw new Error('No image URL provided.');
      }
  
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
      const responsePreview = await fetch(imageUrl);
      const blob = await responsePreview.blob();
      setImageData(URL.createObjectURL(blob));
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      console.log('Alt text for the image:', data.altText.generated_text);
      setalText(data.altText.generated_text)
  
    } catch (error) {
      console.error('Error sending image URL:', error);
    }
  };
  

  return (
    <>
      <Head>
        <title>Display Image from URL</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Display Image from URL</h1>
        <input
          type="text"
          placeholder="Enter image URL"
          onChange={handleURLInputChange}
          style={{ marginBottom: '20px', padding: '5px' }}
        />
        <button onClick={handleDisplayImage} style={{ padding: '10px 20px', margin: '0 10px' }}>
          Display Image
        </button>
      </div>

      {imageData && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img
            src={imageData}
            alt="Fetched Image"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
      {altText.length>0 &&(
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>{altText}</p>

        </div>
      )}
    </>
  );
}