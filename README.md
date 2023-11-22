# Alt Text Generation Frontend

Welcome to the MERN Stack Alt Text Generator! This Next.js application allows users to input an image URL, fetch the image from that URL, and display it on the page along with alt text generated for the image.

Here's an explanation of how the app works:

### Functionality
- **Alt Text Generation:** Implemented a feature that processes uploaded images to automatically generate alt text.
- **Storage in MongoDB:** The generated alt text is stored in the MongoDB database along with the corresponding image data.

### Component State:

The component uses the useState hook to manage three state variables:
- **imageUrl:** Stores the URL entered by the user.
- **altText:** Stores the alt text generated for the fetched image.
- **imageData:** Holds the URL created from the fetched image blob to display it on the page.

### Input Handling:

An input field allows users to enter the URL of the image they want to display.
The handleURLInputChange function updates the imageUrl state as the user types in the input field.

### Display Image Function:

When the "Display Image" button is clicked, the handleDisplayImage function is triggered.
This function performs several tasks:

- Checks if imageUrl is provided, throws an error if it's empty.
- Sends a POST request to a local API endpoint with the entered imageUrl in the request body as JSON.
- Fetches the image from the entered imageUrl separately using fetch and blob().
- Sets the imageData state with the URL created from the fetched image blob using URL.createObjectURL(blob).
- Handles errors for network issues or unsuccessful responses.

### Displaying Image and Alt Text:

If imageData is available (i.e., an image has been fetched successfully), it displays the fetched image on the page.
If altText is generated (received from the API response), it displays the generated alt text below the image.


## Getting Started
### Prerequisites
Ensure that you have Node.js installed on your machine. If not, you can download it from Node.js official website

### Installation
1. Clone the  repository:
`git clone https://github.com/your-username/image-alt-text-generator.git`
2. Open a terminal and navigate to the project directory
3. Install the required dependencies using:
`npm install`

### Running the Application Locally
To run the application on your local machine, follow these steps:
1. After installing the dependencies, start the development server:
`npm run dev`
2. The application will be accessible at http://localhost:3001