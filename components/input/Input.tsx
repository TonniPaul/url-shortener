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
  const [copied, setCopied] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
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
      // setMyLinks(newLink);
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

  // function to copy shortened url on click of the copy button
  const handleCopy = async (shortenedUrl: string, copied: boolean) => {
    await navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
  };

  const handleClear = () => {
    setLinksFromStorage([]);
    localStorage.setItem("links", JSON.stringify([]));
    setClear(true);
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
      <div>

      {linksFromStorage.reverse().map((data) => {
        return (
          <div key={data.id} className={inputStyle.myLinks}>
            <p>{data.myUrl.toLowerCase()}</p>
            <p>{data.shortenedUrl}</p>
            <button
              onClick={() => handleCopy(data.shortenedUrl, data.copied)}
              id={`${copied && inputStyle.copied}`}
            >
              {!copied ? "Copy" : "Copied!"}
            </button>
          </div>
        );
      }).reverse()}
      </div>
      {linksFromStorage.length > 0 && <button onClick={handleClear} className={inputStyle.clearBtn}> Clear Links</button>}
    </section>
  );
};

export default Input;


// const handleCopy = async (shortenedUrl: string) => {
//   await navigator.clipboard.writeText(shortenedUrl);
//   setCopied(true);
// };

// // ...

// {
//   linksFromStorage.reverse().map((data) => {
//     return (
//       <div key={data.id} className={inputStyle.myLinks}>
//         <p>{data.myUrl.toLowerCase()}</p>
//         <p>{data.shortenedUrl}</p>
//         <button
//           onClick={() => handleCopy(data.shortenedUrl)}
//           id={`${copied && inputStyle.copied}`}
//         >
//           {!copied ? "Copy" : "Copied!"}
//         </button>
//       </div>
//     );
//   });
// }
