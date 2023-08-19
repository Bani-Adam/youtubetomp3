import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    };

    try {
      const response = await axios(options);
      setUrlResult(response.data.link);
    } catch (error) {
      console.error(error);
    }

    inputUrlRef.current.value = '';
  };

  return (
    <div className="app">
      <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Ubah video YouTube menjadi MP3 hanya dengan beberapa klik!
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="Paste URL video youtube disini..."
            className="form_input"
            type="text"
          />
          <button type="submit" className="form_button">
            Proses
          </button>
        </form>

        {urlResult && (
          <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">
            <button type="submit" className="form_button">Download MP3</button>
          </a>
        )}

      </section>
    </div>
  );
}

export default App;