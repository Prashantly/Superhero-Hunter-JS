
# Superhero-Hunter-JS

![ss1](https://github.com/Prashantly/Superhero-Hunter-JS/assets/99544800/e51a0f19-de6a-4800-80ea-83d92f028818)

This is a superhero hunter app built using vanilla JavaScript, HTML, and CSS.

## Problem Statement

The goal of this project is to create a web application that allows users to search and view information about superheroes. The app should be built using only vanilla JavaScript without the use of any libraries or frameworks for the JavaScript part. CSS frameworks like Bootstrap are allowed for styling.







## Features

### - Home page

![home](https://github.com/Prashantly/Superhero-Hunter-JS/assets/99544800/8f05eb25-0caf-4b89-96df-213e89670882)

![ss5](https://github.com/Prashantly/Superhero-Hunter-JS/assets/99544800/edeaa7aa-94c4-4cf2-a86f-2d606e6562be)

Fetch and display a list of SuperHeros (Characters) on the home page. Also in search bar that will filter out the character based on search query.result of the superhero have a favorite button, clicking on which superhero should be added to “My favorite superheroes” (a list).
On clicking "Know me better" button search result (any superhero), open a new page with more information about that superhero (Superhero page).

### - Superhero Page

![ss4](https://github.com/Prashantly/Superhero-Hunter-JS/assets/99544800/60c13074-ec9e-4518-bc08-31768bc9d865)

Superhero page show a lot of information about the superhero like their name, photo, bio and other information provided by the API (comics, events, series, stories, etc).

### - My favourite superheroes Page

![ss3](https://github.com/Prashantly/Superhero-Hunter-JS/assets/99544800/84edcd74-b306-4efa-b43d-ee307119dc36)

* Display a list of all the favourite superheroes.
* i have made this list persistent (should have the same number of superheroes before and after closing the browser).
* Remove from favourites button: Each superhero should have remove from favourites button, clicking on which should remove that superhero from the list.









## Tools Used

* Version Control System: Git
* VCS Hosting: GitHub
* Programming / Scripting: JavaScript
* Front-End: HTML, CSS
* Integrated Development Environment: VSCode
## API's

* Marvel API: Use the Marvel API to fetch superhero data. You will need to sign up for a developer account and obtain the necessary API keys. The API provides endpoints to fetch characters, comics, events, series, stories, and more.


## Installation

1 Clone the repository

2 Open the project in a code editor.

3 Create a config.js file in the root directory of the project.

4 Obtain your Marvel API keys (public and private) and store them in the config.js file:

const PUBLIC_KEY = "YOUR_PUBLIC_KEY"

const PRIVATE_KEY = "YOUR_PRIVATE_KEY";

export { PUBLIC_KEY, PRIVATE_KEY };

5 Save the config.js file.

Open the index.html file in a web browser to access the superhero hunter app.
## Demo

Insert gif or link to demo

End product or live demo of this application can be found at 
https://superhero-hunter-app-3v2m.onrender.com
