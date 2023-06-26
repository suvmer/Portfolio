const input = document.querySelector("#inp");
const list = document.querySelector("#list");

var state = {
    posts: []
}

const setState = (newState) => {
    state = newState;
    render();
} 

const render = () => {
    list.innerHTML = "";
    state.posts.forEach((el, ind) => {
        var postBar = Object.assign(document.createElement("div"), {innerHTML: `${ind+1}: ${el}`});
        postBar.addEventListener('click', event => removePost(ind));
        list.appendChild(postBar);
    })
}

const addPost = () => {
    setState({...state, posts: [...state.posts, input.value]});
    input.value = "";
    input.focus();
    console.log(state);
}

const removePost = (id) =>
    setState({...state, posts: state.posts.filter((el, ind) => ind != id)});
