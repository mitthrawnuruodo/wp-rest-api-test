const url = "https://www.geek.no/wp-json/wp/v2/posts";
//const url = "https://www.geek.no/wp-json/wp/v2/pages";
fetch(url)
.then(response => response.json())
.then(data => {
  //console.log('Success:', data);
  listPosts(data);
})
.catch((error) => {
  console.error('Error:', error);
});

const output = document.querySelector("#posts");
function listPosts (posts) {
    let myList = "";
    for (let post of posts) {
        console.log(post);
        myList += `
        <li>
            <a href="post.html?id=${post.id}">
                ${post.title.rendered}
            </a>
        </li>`;
    }
    output.innerHTML = myList;
}