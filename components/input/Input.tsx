import Image from "next/image";
import inputStyle from "./input.module.css";
import formBg from "../../public/assets/bg-shorten-desktop.svg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import * as yup from "yup";

interface Links {
  id: string;
  myUrl: string;
  shortenedUrl: string;
  copied: boolean;
}
const Input = () => {
  const [myUrl, setMyUrl] = useState("");
  const [links, setLinks] = useState<Links[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    console.log("Getting local");
    const storedLinks = JSON.parse(localStorage.getItem("links") || "[]");
    if (storedLinks.length > 0) {
      console.log(storedLinks);
      setLinks(storedLinks);
    }
  }, []);

  useEffect(() => {
    console.log("New Local added");
    console.log(links.length);
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    // return clearTimeout(timer);
  }, [isCopied]);

  const linkSchema = yup.object().shape({
    myUrl: yup
      .string()
      .url("Please enter a valid URL")
      .required("URL is required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUrl(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await linkSchema.validate({ myUrl });
      const response = await axios.post(
        `https://api.shrtco.de/v2/shorten?url=${myUrl}`
      );
      const newLink = {
        id: crypto.randomUUID(),
        myUrl: myUrl,
        shortenedUrl: response.data.result.short_link,
        copied: false,
      };
      setMyUrl("");
      setLinks([...links, newLink]);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // function to copy link on button click
  const handleCopy = async (index: number) => {
    await navigator.clipboard.writeText(links[index].shortenedUrl);

    const updatedLinks = [...links];
    updatedLinks[index].copied = true;

    setIsCopied(true);
    setLinks(updatedLinks);

    // set timeout to update the copied state back to false after 3 seconds
    setTimeout(() => {
      updatedLinks[index].copied = false;
      setLinks(updatedLinks);
    }, 3000);

    // update local storage
    // localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  // function to delete individual link
  const handleDelete = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
  };

  // function to delete all links
  const handleClear = () => {
    setLinks([]);
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
          onChange={handleChange}
        />
        {/* {<small>{errorMessage}</small>} */}
        <button>Shorten It!</button>
      </form>
      <div className={inputStyle.links_div}>
        {links
          .map((data, index) => {
            return (
              <div key={data.id} className={inputStyle.myLinks}>
                <p>{data.myUrl.toLowerCase()}</p>
                <p>{data.shortenedUrl}</p>
                <button
                  onClick={() => handleCopy(index)}
                  id={isCopied && data.copied ? inputStyle.copied : ""}
                >
                  {isCopied && data.copied ? "Copied!" : "Copy"}
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
      {links.length > 1 && (
        <button onClick={handleClear} className={inputStyle.clearBtn}>
          Clear Links
        </button>
      )}
    </section>
  );
};

export default Input;


