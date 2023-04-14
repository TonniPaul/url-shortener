import Image from "next/image";
import inputStyle from "./input.module.css";
import formBg from "../../public/assets/bg-shorten-desktop.svg";
import { SetStateAction, useState } from "react";
import axios from "axios";

interface LinksProp {
  id: string;
  myUrl: string;
  shortenedUrl: string;
}
const Input = () => {
  const [myUrl, setMyUrl] = useState("");
  const [myLinks, setMyLinks] = useState<LinksProp>({
    id: "",
    myUrl: "",
    shortenedUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState<boolean>(false);
  const [linksFromStorage, setLinksFromStorage] = useState<LinksProp[]>([]);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMyUrl(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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

  // function to copy shortened url on click of the copy button
  const handleCopy = async () => {
    await navigator.clipboard.writeText(myLinks.shortenedUrl);
    setCopied(true);
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

      {linksFromStorage.reverse().map((data) => {
        return (
          <div key={data.id} className={inputStyle.myLinks}>
            <p>{data.myUrl.toLowerCase()}</p>
            <p>{data.shortenedUrl}</p>
            <button onClick={handleCopy} id={`${copied && inputStyle.copied}`}>
              {!copied ? "Copy" : "Copied!"}
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default Input;
