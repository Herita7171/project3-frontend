import React, { forwardRef, useEffect, useRef, useState } from "react";

const commonInputClassName = 'w-full border-gray-400 outline-none focus:border-secondary transition ';

export default function LiveSearch({
    value = "",
    placeholder = "",
    results = [],
    name,
    selectedResultStyle,
    resultContainerStyle,
    inputStyle,
    renderItem = null,
    onChange = null,
    onSelect = null,
  }) {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
  
    const handleOnFocus = () => {
      if (results.length) setDisplaySearch(true);
    };
  
    const closeSearch = () => {
      setDisplaySearch(false);
      setFocusedIndex(-1);
    };
  
    const handleOnBlur = () => {
      setTimeout(() => {
        closeSearch();
      }, 100);
    };
  
    const handleSelection = (selectedItem) => {
      if (selectedItem) {
        onSelect(selectedItem);
        closeSearch();
      }
    };
  
    const handleKeyDown = ({ key }) => {
      let nextCount;
      const keys = ["ArrowDown", "ArrowUp", "Enter"];
      if (!keys.includes(key)) return;
  
      // move selection up and down
      if (key === "ArrowDown") {
        nextCount = (focusedIndex + 1) % results.length;
      }
      if (key === "ArrowUp") {
        nextCount = (focusedIndex + results.length - 1) % results.length;
      }
  
      if (key === "Enter") return handleSelection(results[focusedIndex]);
  
      setFocusedIndex(nextCount);
    };
  
    const getInputStyle = () => {
      return inputStyle
        ? inputStyle
        : commonInputClassName + " border-2 rounded p-1 text-sm";
    };
  
    return (
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          className={getInputStyle()}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={onChange}
        />
        <SearchResults
          focusedIndex={focusedIndex}
          visible={displaySearch}
          results={results}
          onSelect={handleSelection}
          renderItem={renderItem}
          resultContainerStyle={resultContainerStyle}
          selectedResultStyle={selectedResultStyle}
        />
      </div>
    );
}

const SearchResults = ({
    visible,
    results = [],
    focusedIndex,
    onSelect,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
  }) => {
    const resultContainer = useRef();
  
    useEffect(() => {
      resultContainer.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, [focusedIndex]);
  
    if (!visible) return null;
  
    return (
      <div className="absolute z-50 right-0 left-0 top-10 shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar bg-red-100 rounded">
        {results.map((result, index) => {
          const getSelectedClass = () => {
            return selectedResultStyle
              ? selectedResultStyle
              : "bg-yellow-300";
          };
  
          return (
            <ResultCard
              ref={index === focusedIndex ? resultContainer : null}
              key={index.toString()}
              item={result}
              renderItem={renderItem}
              resultContainerStyle={resultContainerStyle}
              selectedResultStyle={
                index === focusedIndex ? getSelectedClass() : ""
              }
              onClick={() => onSelect(result)}
            />
          );
        })}
      </div>
    );
  };

  const ResultCard = forwardRef((props, ref) => {
    const {
      item,
      renderItem,
      resultContainerStyle,
      selectedResultStyle,
      onClick,
    } = props;
  
    const getClasses = () => {
      if (resultContainerStyle)
        return resultContainerStyle + " " + selectedResultStyle;
  
      return (
        selectedResultStyle +
        " cursor-pointer rounded overflow-hidden hover:bg-red-200 transition"
      );
    };
    return (
      <div onClick={onClick} ref={ref} className={getClasses()}>
        {renderItem(item)}
      </div>
    );
  });
