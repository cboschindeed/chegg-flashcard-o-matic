import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ paths }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {paths.map((path, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${
                index === paths.length - 1 ? "active" : ""
              }`}
            >
              {path.link ? (
                <Link to={path.link}>
                  {index === 0 ? (
                    <i className="bi bi-house-door-fill"></i>
                  ) : null}{" "}
                  {path.text}
                </Link>
              ) : (
                <span>{path.text}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
