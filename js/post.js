const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');
if (!id) { window.location = "posts.html"; }

//const url = `https://www.geek.no/wp-json/wp/v2/posts/${id}`;
//const url = `https://www.geek.no/wp-json/wp/v2/pages/${id}`;
const url = `https://www.geek.no/wp-json/wp/v2/posts/${id}?_embed=wp:featuredmedia`;

fetch(url)
.then(response => response.json())
.then(data => {
    //console.log('Success:', data);
    displayPost(data);
})
.catch((error) => {
    console.error('Error:', error);
});

const output = document.querySelector("#post");
function displayPost (data) {
    output.innerHTML = ""; // Remove loading...
    console.log(data); 
    const title = data.title.rendered;
    const excerpt = data.excerpt.rendered; // Use the brief content excerpt
    //const excerpt = data.content.rendered; // ...or the full content
    const link = data.link;

    // Using ?_embed=wp:featuredmedia (and not the addImage() function below)?
    // Trows an error when the _embed parameter is not enabled
    // PS! This does not work with pages... so, then do it the hard way
    try {
        console.log (data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    } catch (e) {
        console.warn ("Enable _embed to use this");
    }

    // Getting the image the hard way (making another call):
    console.log ("media id:", data.featured_media)
    //getImageURL(data.featured_media);

    // Getting the image the easy way (by using embedded media):
    //console.log("image:", data._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    addImage(data._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);

    let content = `
    <h1>${title}</h1>
    ${excerpt}
    <p>&gt; <a href="${link}" target="_blank">Read more @ geek.no</a></p>
    `;

    output.innerHTML += content;
    document.title = title;
}

/**
 * PS! This is the cumbersome way of getting the ID, 
 * it's better to use the _embedded parameter 
 * **/
function getImageURL(id) {
    fetch(`https://www.geek.no/wp-json/wp/v2/media/${id}`)
    .then(response => response.json())
    .then(data => {
        //console.log('Success (getImageURL):', data);
        addImage (data.source_url);
    })
    .catch((error) => {
        console.error('Error (getImageURL):', error);
    });
}

function addImage(src) {
    console.log ("IMG: " + src);
    if (src) {
        let img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.width = 960;
        //console.log("img.tag:", img, "output:", output);
        output.prepend(img);
    }
}