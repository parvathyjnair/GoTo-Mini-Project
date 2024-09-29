import React, { useState, useRef, useEffect } from "react";
import reportDestination from "../utils/reportDestination";
import { useToast } from "../utils/ToastContext";

interface ComboBoxProps {
  options: string[];
  onSelect: (option: string) => void;
  email: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelect, email }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [longPressOption, setLongPressOption] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const longPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const reportConfirmation = useRef<HTMLDialogElement>(null);
  const { showToast } = useToast();

  const filteredOptions = options
    .filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    toggleDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    setSearchTerm(option);
    toggleDropdown(false);
  };

  const handleAddNewOption = () => {
    const newOption = searchTerm.trim();
    if (newOption && !options.includes(newOption)) {
      onSelect(newOption);
      setSearchTerm(newOption);
      toggleDropdown(false);
    }
  };

  const handleDropdownVisibility = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    toggleDropdown(true);
  };

  const toggleDropdown = (
    show: boolean = !dropdownRef.current?.classList.contains("active")
  ) => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("active", show);
    }
  };

  const handleLongPress = (option: string) => {
    setLongPressOption(option);
    reportConfirmation.current?.showModal();
  };

  const handlePointerDown = (option: string, event: React.PointerEvent<HTMLButtonElement>) => {
    longPressTimeoutRef.current = setTimeout(() => {
      handleLongPress(option);
    }, 500); // Adjust the duration as needed

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }

    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  };

  const closeReportModal = () => {
    reportConfirmation.current?.close();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="dropdown" data-dropdown ref={dropdownRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleDropdownVisibility}
          className="destination-selector-button"
          placeholder="Search your destination..."
        />
        <div className="dropdown-menu">
          <div className="dropdown-cities">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  className="dropdown-item"
                  onClick={() => handleOptionSelect(option)}
                  onPointerDown={(event) => handlePointerDown(option, event)}
                  onPointerUp={handlePointerUp}
                >
                  {option}
                </button>
              ))
            ) : (
              <button className="dropdown-item" onClick={handleAddNewOption}>
                Add new: {searchTerm}
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog ref={reportConfirmation}>
        <div className="modal-content">
          <div>
            Report the destination:
            <div style={{ fontWeight: "bold", marginTop: "1rem", textAlign: "center" }}>{longPressOption + " ?"}</div>
          </div>
          <div>It will be removed after 5 reports.</div>
          <div className="buttons">
            <button className="close-btn" onClick={closeReportModal}>
              No
            </button>
            <button
              className="navbar__logout"
              onClick={async () => {
                let msg = await reportDestination(longPressOption, email);
                showToast(msg);
                closeReportModal();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ComboBox;