import Image from "next/image";
import inputStyle from "./input.module.css";
import formBg from "../../public/assets/bg-shorten-desktop.svg";
import { SetStateAction, useState } from "react";
import axios from "axios";

interface LinksProp {
  myUrl: string;
  shortenedUrl: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Input = () => {
  const [myUrl, setMyUrl] = useState("");
  const [myLinks, setMyLinks] = useState<LinksProp>({
    myUrl: "",
    shortenedUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMyUrl(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Function to get data from API using the input value
    try {
      const response = await axios.post(
        `https://api.shrtco.de/v2/shorten?url=${myUrl}`
      );
      setMyLinks({
        myUrl: myUrl,
        shortenedUrl: response.data.result.short_link,
      });
      setMyUrl("");
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

      {myLinks.shortenedUrl && (
        <div className={inputStyle.myLinks}>
          <p>{myLinks.myUrl}</p>
          <p>{myLinks.shortenedUrl}</p>
          <button onClick={handleCopy} id={`${copied && inputStyle.copied}`}>
            {!copied ? "Copy" : "Copied!"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Input;
