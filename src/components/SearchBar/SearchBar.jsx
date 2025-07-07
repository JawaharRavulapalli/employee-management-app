import React from "react";
import { useEffect, useState } from "react";
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, onNewEmployee, onCancel }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, 300); 
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        onNewEmployee?.(); 
      }
      if (e.key === 'Escape') {
        onCancel?.(); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewEmployee, onCancel]);
  
  return (
    <input
      type="text"
      placeholder="Search employees..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{ padding: '8px', width: '100%' }}
    />
  );
}

export default SearchBar;
