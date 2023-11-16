"use client";
import React from "react";
import useSWR from "swr";
import Select from "react-select";

// components

// context or store

// constants or functions
import { CHATGPT_DEFAULT, REVALIDATE_RATE } from "@/constants";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels, {
    refreshInterval: REVALIDATE_RATE,
  });
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: CHATGPT_DEFAULT,
  });

  return (
    <div className="form-control w-full">
      <label className="label w-full">
        <span className="label-text">Model</span>
      </label>

      <Select
        isSearchable
        defaultValue={model}
        placeholder={model}
        options={models?.modelOptions}
        isLoading={isLoading}
        menuPosition="fixed"
        className="mt-2 font-brand-roboto bg-transparent"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "none",
            // borderColor: "none",
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#212121",
            color: "#fff",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: "#fff",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#fff",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#fff",
          }),
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
