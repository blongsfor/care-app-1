import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import DateTimePickerValue from "../components/DateTimePicker";
import Categoryelector from "./CategorySelector";
import ClientSelector from "./ClientSelector";

export default function DocumentationForm() {
  const router = useRouter();

  return (
    <>
      <div>
        <h2>Create Documentation Entry</h2>
        <form>
          <DateTimePickerValue />
          <Categoryelector />
          <ClientSelector />

          <div>
            <label htmlFor="documentation">Documentation</label>
            <textarea
              id="documentation"
              name="documentation"
              rows="15"
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
