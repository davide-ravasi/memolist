import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlist.actions";
import { errorMessage } from "../redux/system/system.actions";

import { convertDateFromTimestamp } from "../outils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ElementDetails = ({
  itemDet,
  categories,
  onRemove,
  isAdmin,
  currentUser,
  wishlist,
}) => {
  const {
    id,
    category,
    description,
    link,
    text,
    name,
    created_at,
    userName,
  } = itemDet;
  const createdAtConverted = convertDateFromTimestamp(created_at);

  const [favourite, setFavourite] = useState(false);
  const dispatch = useDispatch();

  const codeRef = useRef(null);

  const cat = categories.find((cat) => {
    return cat.name === category;
  });

  const copyToClipboard = (e) => {
    codeRef.current.select();
    document.execCommand("copy");
    dispatch(errorMessage("copied to clipboard"));
  };

  const roundbtnStyles =
    "flex justify-center items-center text-white text-sm absolute rounded-full h-6 w-6 transition duration-500 ease-in-out";

  useEffect(() => {
    if (wishlist && wishlist.includes(id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [wishlist, id]);

  return (
    <div key={id} className="bg-white rounded-md p-3 shadow-xl relative">
      <div className="text-gray-900 text-xl">{name}</div>
      <span
        className="text-gray-700 bg-gray-100 uppercase shadow-xl p-1 text-xs rounded"
        style={cat ? { backgroundColor: cat.color } : {}}
      >
        {category}
      </span>
      {description && description.replace(/<\/?[^>]+(>|$)/g, "") !== "" && (
        <div className="text-gray-500 mt-4 text-sm">{parse(description)}</div>
      )}
      <div className="relative text-gray-500 text-xs mt-2 mb-10">
        <button
          title="Copy to clipboard"
          onClick={(e) => copyToClipboard(e)}
          className={`${roundbtnStyles} absolute bg-gray-400 top-1 right-2 hover:bg-blue-500`}
        >
          <FontAwesomeIcon icon="copy" />
        </button>
        <form className="absolute opacity-0">
          <textarea ref={codeRef} value={text} />
        </form>
        <SyntaxHighlighter
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          wrapLines={true}
          language={`${category === "css" ? "css" : "javascript"}`}
          style={a11yDark}
        >
          {text}
        </SyntaxHighlighter>
      </div>
      <div className="absolute text-gray-400 text-xs pt-2 left-3 bottom-2">
        Created: {createdAtConverted}
        <br /> {userName && `by ${userName}`}
      </div>

      {currentUser && (
        <button
          onClick={() =>
            favourite
              ? dispatch(removeFromWishlist(currentUser.uid, id))
              : dispatch(addToWishlist(currentUser.uid, id))
          }
          title={favourite ? "Remove from wishlist" : "Add to wishlist"}
          className={`${roundbtnStyles} ${
            favourite ? "selected bg-red-400" : "bg-gray-400"
          } top-3 right-9 hover:bg-red-600`}
        >
          <FontAwesomeIcon icon="heart" />
        </button>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          title="Visit the source for this snippet"
          className={`${roundbtnStyles} top-3 right-2 bg-gray-400 hover:bg-gray-700`}
        >
          <FontAwesomeIcon icon="link" />
        </a>
      )}

      {isAdmin && (
        <>
          <Link
            to={`/element/edit/${id}`}
            title="Edit this snippet"
            className={`${roundbtnStyles} bottom-3 right-9 bg-gray-400 hover:bg-green-700`}
          >
            <FontAwesomeIcon icon="pen" />
          </Link>
          <button
            title="Remove this snippet"
            className={`${roundbtnStyles} bottom-3 right-2 bg-red-400 hover:bg-red-700 cursor-pointer`}
            onClick={() => onRemove(itemDet)}
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </>
      )}
    </div>
  );
};

export default ElementDetails;
