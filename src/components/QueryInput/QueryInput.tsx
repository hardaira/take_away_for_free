import { SlMagnifier } from 'react-icons/sl';
import React, {
  useState, useRef, useEffect
} from 'react';
import { useSearchParams } from "react-router-dom";
import './QueryInput.scss';
export const QueryInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // const inputRef = useRef<HTMLInputElement>(null);

  const storedCity = localStorage.getItem("activeCity");

  const activeCity = searchParams.get("city") || storedCity || "Вся Україна";

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);
  return (
    <div className="list__heading">
      <p className="list__top">{activeCity}, обирай найкращі пропозиції!</p>
      <div className="input-wrapper">
        <SlMagnifier className="input-icon" />
        <input
          // ref={inputRef}
          type="text"
          className="input-style query"
          placeholder="Шукай за назвою"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QueryInput;
