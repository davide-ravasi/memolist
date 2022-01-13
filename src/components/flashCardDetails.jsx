import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlashCardDetails = ({ description, link1 }) => {
  const [showDetails, setShowDetails] = useState(false);

  const expandDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <>
      {showDetails && (
        <div>
          <div
            className="mt-2 bg-gray-100 p-2 text-gray-700"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <a
            className="block underline text-gray-700 mt-4 mb-2 text-sm"
            href={link1}
            target="_blank"
          >
            <FontAwesomeIcon icon="link" /> See the documentation
          </a>
        </div>
      )}
      <a
        href="#"
        onClick={expandDetails}
        className="block mt-4 underline decoration-1 text-indigo-500 text-sm"
      >
        {!showDetails ? `Expand details ${">"}` : `${"<"} Collapse details`}
      </a>
    </>
  );
};

export default FlashCardDetails;
