"use client"; // This is a client component 👈🏽

// 👇👇👇👇👇👇👇👇 REST API Example Below 👇👇👇👇👇👇👇👇



// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Tooltip,
// } from "@material-tailwind/react";




// export default function Home() {

//🧠  Create a state variables to store the data returned from the API 

//   const [data, setData] = useState(null);
//   const [characterData, setCharacterData] = useState([]);

//   🧠  Create a function to fetch the data from the API
//   async function fetchRickAndMortyData() {
//     const apiUrl = 'https://rickandmortyapi.com/api/character/';

  
//   🧠 Make a request to the API and store the response in a variable
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error;
//     }
//   }
// /🧠 
//   useEffect(() => {
//     fetchRickAndMortyData().then(data => {
//       for (let i = 0; i < data.results.length; i++) {
   //🧠 Fields to be displayed on card Name, Status, Origin, Location, Image and Episodes stored in a object
//         const character = {
 
//           name: data.results[i].name,
//           status: data.results[i].status,
//           origin: data.results[i].origin.name,
//           location: data.results[i].location.name,
//           image: data.results[i].image,
//           episodes: data.results[i].episode[0]
//         }
///🧠  Push the object into the state variable
//         setCharacterData(prevState => [...prevState, character])
//       }
//     });
//   }

//   , []);

//   return (
//     <div>

//       <div>
// 🧠  Map through the state variable and display the data on the card

//         {characterData.map((character, index) => {
//           return (
//             <div key={index}>
//               <Card className=" ml-5 mt-3 mb-3 w-96 bg-gray-800">
//       <CardHeader floated={false} className=" h-200" >
//       <Image src={character.image} alt={character.name} width="0" height="0" sizes='100vw' className='w-full h-auto' />
//       </CardHeader>
//       <CardBody className="text-center">
//         <Typography variant="h4" color="white" className="mb-2">
//         {character.name}
//         </Typography>
//         <Typography color={character.status === 'Alive' ? "green" : "red" } className="font-medium" textGradient>
//         {character.status}
//         </Typography>
//       </CardBody>
//       <CardFooter className="overflow:auto  flex justify-centerr pt-2 text-white">
//       {character.origin} <br />

//       {character.location} <br />
//       {character.episodes}
//       </CardFooter>

//     </Card>
//             </div>

//           )
//         })}

//     </div>
//     </div>
//   )
// }

//👇👇👇👇👇👇👇👇 GraphQl Example Below👇👇👇👇👇👇👇👇

// Import necessary libraries
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

// Create an Apollo Client
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql", // GraphQL endpoint different from REST API endpoint
  //Apollo Client stores the data in its cache once it's fetched. This is to avoid making unnecessary requests to the API.
  cache: new InMemoryCache(),
});


export default function Home() {
  // Create a state variable to store the data returned from the API
  const [characterData, setCharacterData] = useState([]);

  // Define a GraphQL query to fetch character data
  const GET_RICK_AND_MORTY_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        status
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          air_date
          name
         
        }
      }
    }
  }

  `;

  // Create a function to map over episode data and return only the first episode
const characterDataWithOneEpisode = characterData.map((character) => {
  // Check if there are episodes available for the character
  if (character.episode.length > 0) {
    // Select the first episode from the list
    const firstEpisode = character.episode[0];

    // Update the character object to include only the selected episode
    return {
      ...character,
      episode: [firstEpisode], // Store the selected episode as an array
    };
  } else {
    // If there are no episodes, leave the character's episode field empty
    return character;
  }
});


// 
  useEffect(() => {
    // Fetch data using Apollo Client and GraphQL query
    client
    //  Make a request to the API and store the response in a variable
      .query({ query: GET_RICK_AND_MORTY_CHARACTERS })
//  Update the state variable with the data from the API
      .then((result) => {
        const data = result.data.characters.results;
        setCharacterData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-white text-3xl text-center mb-5 mt-5">Rick and Morty Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center ">
        {characterData.map((character, index) => {
          return (
            <div className="flex justify-center"  key={index}>
              <Card className=" mt-3 mb-3 w-96 bg-gray-800 ">
                <CardHeader floated={false} className="h-200">
                  <img
                    src={character.image}
                    alt={character.name}
                    width="200"
                    height="200"
                    className="w-full h-auto"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h4" color="white" className="mb-2">
                    {character.name}
                  </Typography>
                  <Typography
                    color={character.status === 'Alive' ? 'green' : 'red'}
                    className="font-medium"
                    textGradient
                  >
                    {character.status}
                  </Typography>
                </CardBody>
                <CardFooter className=" pt-2 text-white">
                  <div className=" text-center">
                  <h2>Origin:   {character.origin.name} </h2> <br />
                  
                  <h2>Location: {character.location.name} </h2> <br />
               
                  <h2>First Appearance: {character.episode[0].name} </h2> <br />
                 
                  <h2>Latest Appearance: {character.episode[(character.episode.length -1)].name} </h2> <br />
                  
                  </div>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
