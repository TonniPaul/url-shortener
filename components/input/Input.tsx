import Image from "next/image";
import inputStyle from "./input.module.css";
import formBg from "../../public/assets/bg-shorten-desktop.svg";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

interface LinksProp {
  id: string;
  myUrl: string;
  shortenedUrl: string;
  copied : boolean
}
const Input = () => {
  const [myUrl, setMyUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [linksFromStorage, setLinksFromStorage] = useState<LinksProp[]>([]);

  useEffect(() => {
    // get the links from local storage when the component mounts
    const links = JSON.parse(localStorage.getItem("links") || "[]");
    setLinksFromStorage(links);
  }, []);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMyUrl(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!myUrl.trim()) return;

    try {
      const response = await axios.post(
        `https://api.shrtco.de/v2/shorten?url=${myUrl}`
      );
      const newLink = {
        id: crypto.randomUUID(),
        myUrl: myUrl,
        shortenedUrl: response.data.result.short_link,
      };
      setMyUrl("");

      // Get the links array from local storage, or create an empty array if it doesn't exist yet
      const links = JSON.parse(localStorage.getItem("links") || "[]");

      // Add the new link to the links array and store it in local storage
      const updatedLinks = [...links, newLink];
      localStorage.setItem("links", JSON.stringify(updatedLinks));

      // Update the links state with the new link
      setLinksFromStorage(updatedLinks);
    } catch (error) {
      console.log(error);
    }
  };

  // function to copy link on button click
  const handleCopy = async (index: number) => {
    const links = [...linksFromStorage];
    await navigator.clipboard.writeText(links[index].shortenedUrl);
    links[index].copied = true;
    setLinksFromStorage(links);
  };

  // function to delete individual link
  const handleDelete = (id: string) => {
    const links = [...linksFromStorage];
    const updatedLinks = links.filter((link) => link.id !== id);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    setLinksFromStorage(updatedLinks);
  };

  // function to delete all links
  const handleClear = () => {
    setLinksFromStorage([]);
    localStorage.setItem("links", JSON.stringify([]));
  };

  return (
    <section className={inputStyle.input_container}>
      <form className={inputStyle.inputCard} onSubmit={handleSubmit}>
        <Image
          src={formBg}
          alt="form-bg-img"
          className={inputStyle.formBgImg}
        />
        <input
          type="text"
          name="link"
          id="link"
          placeholder="Shorten a link here..."
          value={myUrl}
          className={`${errorMessage && inputStyle.errorMsg}`}
          onChange={handleChange}
        />
        <button>Shorten It!</button>
      </form>
      <div className={inputStyle.links_div}>
        {linksFromStorage
          .map((data, index) => {
            return (
              <div key={data.id} className={inputStyle.myLinks}>
                <p>{data.myUrl.toLowerCase()}</p>
                <p>{data.shortenedUrl}</p>
                <button
                  onClick={() => handleCopy(index)}
                  id={data.copied ? inputStyle.copied : ""}
                >
                  {!data.copied ? "Copy" : "Copied!"}
                </button>
                {data.copied && (
                  <button
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                    className={inputStyle.delete}
                  >
                    x
                  </button>
                )}
              </div>
            );
          })
          .reverse()}
      </div>
      {linksFromStorage.length > 2 && (
        <button onClick={handleClear} className={inputStyle.clearBtn}>
          Clear Links
        </button>
      )}
    </section>
  );
};

export default Input;

