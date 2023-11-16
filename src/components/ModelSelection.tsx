"use client";
import React from "react";
import useSWR from "swr";
import Select from "react-select";

// import { CHATGPT_DEFAULT, REVALIDATE_RATE } from "@/lib/constants";
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
    <div className="mt-2">
      <Select
        isSearchable
        defaultValue={model}
        placeholder={model}
        options={models?.modelOptions}
        isLoading={isLoading}
        menuPosition="fixed"
        className="mt-2 font-brand-roboto"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#212121",
            borderColor: "#212121",
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
