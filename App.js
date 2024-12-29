//const heading = React.createElement("h1", {id:"heading"}, "Hello World from React!!!!!");
const parent = React.createElement("div", { id: "parent" },
    React.createElement("div", { id: "child" },
       [React.createElement("h1", {}, "I am an h1 tag"),React.createElement("h2", {}, "I am an h2 tag")]
    )
);
console.log(parent);
//console.log(heading); //React.createElement gives us object so heading is a object . It is not h1 tag yet
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
//root.render(heading); // It will take object i.e heading and convert it into h1 tag(HTML) and will put it into DOM