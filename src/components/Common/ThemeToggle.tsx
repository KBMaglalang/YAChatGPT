"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // set theme on initial load
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  // update localstorage on theme change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", localTheme!);
    }
  }, [theme]);

  // update state on toggle
  const handleToggleTheme = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTheme(e.target.checked ? "dark" : "light");
    },
    []
  );

  // set toggle checked value
  const toggleChecked = theme === "light" ? false : true;

  return (
    <label className="swap swap-rotate btn-outline btn">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        checked={toggleChecked}
        onChange={handleToggleTheme}
      />

      {/* sun icon */}
      <SunIcon className="swap-on fill-current w-4 h-4" />

      {/* moon icon */}
      <MoonIcon className="swap-off fill-current w-4 h-4" />
    </label>
  );
}
