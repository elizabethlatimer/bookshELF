const axios = require('axios')

const MAX_RESULTS = '100';
const BASE_URL = `https://www.googleapis.com/books/v1/volumes?maxResults=${MAX_RESULTS}&q=`

export async function search(searchString) {
  let query = searchString.split(' ').join('%20');

  let results = await axios.request({url: `${BASE_URL}${query}`, headers: {'Accept': 'application/json'}}).data;

  return results;
}

//TODO implement advanced search

/**
After query string add for example +inauthor:tolkien

intitle: Returns results where the text following this keyword is found in the title.
inauthor: Returns results where the text following this keyword is found in the author.
inpublisher: Returns results where the text following this keyword is found in the publisher.
subject: Returns results where the text following this keyword is listed in the category list of the volume.
isbn: Returns results where the text following this keyword is the ISBN number.
lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
oclc: Returns results where the text following this keyword is the Online Computer Library Center number.

*/