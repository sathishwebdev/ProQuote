fetch("https://programming-quotes-api.herokuapp.com/quotes")
.then(data=> data.json())
.then(response =>{ 
    console.log(response)
    let data = response
    display(data)
})

const display = (data) =>{
    let root = document.getElementById("root")
    
    data.map(({en, author, id })=>{
        let div = document.createElement("div")
        div.setAttribute("class", "container")
        let p = document.createElement("p")
        p.innerHTML = `<span>${en}</span><p style="text-align: right; font-size: small;"> ~ ${author} </p></p>`
        let button = document.createElement('button')
        button.setAttribute('class','btn')
        button.addEventListener('click', ()=>{share(`${en}`, `${author}`)})
        button.innerHTML='Share'
        div.append(p, button)
        root.append(div)
    })
    
}


function share(en, author) {
  console.log("share")
      if (navigator.canShare) {
        navigator
          .share({
            text: `${en} \n \n\n ~${author} \n `,
            url: "",
            title: `Pro Quote | ${author}`,
          })
          .then(() => console.log("Share was successful."))
          .catch((error) => alert("Sharing failed", error));
      } else {
        try { //if location is http its change to https
          if (navigator.share === undefined) {
            if (window.location.protocol === "http:") {
              window.location.replace(
                window.location.href.replace(/^http:/, "https:")
              );
            }
          }
        } catch (error) {
          alert("Sharing failed", error);
        }
      }
  }

