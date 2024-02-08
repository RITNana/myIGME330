// generates random technobabble phrases 
export const randomElement = (wordArray) => {
    // pass in an array as a parameter and return a random word from the array
    return wordArray[Math.floor(Math.random() * wordArray.length)]
} 