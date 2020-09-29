import React, { useState, useEffect } from "react";

function MemeGenerator() {
  const [randomImage, setRandomImage] = useState("logo512.png");
  const [memeImage, setMemeImage] = useState([])
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText]=useState("")

  function fillText(e) {
    const { value, name } = e.target;
    name ==="topText" ? setTopText(prevState => value) : setBottomText(prevState=> value)
  }

  function generateMeme(e){
    e.preventDefault()

    const randNum = Math.floor(Math.random() * memeImage.length)
    const randomImageUrl = memeImage[randNum].url
    
    setRandomImage(randomImageUrl)

  }


  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => {
        const {memes} = res.data
        setMemeImage(memes)
      })
    },[])
    
    return (
  //     <div>
  //     <h1>This is a MemeGenerator</h1>
  //     <label>
  //         Top Text
  //     <input name="topText" value={topText} onChange={fillText} />
  //     </label>
  //     <label>
  //       Bottom Text
  //     <input name="bottomText" value={bottomText} onChange={fillText} />
  //     </label>
  //     <br/>
  //     <button>Generate Meme</button>

  // <h1>{topText}</h1>
  // <h1>{bottomText}</h1>
  // <img src={memeImage} height="60px" width="60px" alt="random pic" />
  //   </div>
  <div>
    <form className="meme-form" onSubmit={generateMeme}>
      <input placeholder="Top Text" type="text" name="topText" value={topText} onChange={fillText}/>
      <input placeholder="Bottom Text" type="text" name="bottomText" value={bottomText} onChange={fillText}/>
      <button>Generate Meme</button>
    </form>
    <div className="meme">
      <img src={randomImage} alt=""/>
    <h2 className="top">{topText}</h2>
    <h2 className="bottom">{bottomText}</h2>
    </div>

    <div className="conclusion">Thank you for wasting your time!!</div>
  </div>
  );
}

export default MemeGenerator;
