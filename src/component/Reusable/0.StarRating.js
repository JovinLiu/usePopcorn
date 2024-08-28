import {useState} from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

//通过三个Props：maxRating = 10, color = "#fcc419", size = "20px"设置三个Component API，
export function StarRating({maxRating = 10, color = "#fcc419", size = 20, rating, setRating}) {
  const [tempRating, setTempRating] = useState();

  const arr = Array.from({length: maxRating}, (_, i) => <Star i={i + 1} key={i + 1} color={color} size={size} tempRating={tempRating} setTempRating={setTempRating} rating={rating} setRating={setRating} />);

  return (
    <span className="star-container">
      {arr.map((star, i) => (
        <div className="star" key={i}>
          {star}
        </div>
      ))}
      <span className="userRating">{tempRating || rating}</span>
    </span>
  );
}

function Star({i, color, size, tempRating, setTempRating, rating, setRating}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={(tempRating ? tempRating >= i : rating >= i) ? `${color}` : "none"}
      viewBox="0 0 20 20"
      stroke={`${color}`}
      style={{width: `${size}px`, height: `${size}px`}}
      className="star"
      role="button"
      onMouseEnter={() => {
        setTempRating(i);
      }}
      onMouseLeave={() => {
        setTempRating("");
      }}
      onClick={() => setRating(i)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
}
