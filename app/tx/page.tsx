"use client";

import {
  IconCircleCheckFilled,
  IconCircleLetterIFilled,
  IconCircleXFilled,
  IconLoader2,
} from "@tabler/icons-react";
import {
  unstable_ViewTransition as ViewTransition,
  startTransition,
  useState,
} from "react";
import { cn } from "~/utils/style";
import "./view-transitions.css";

const stateOptions = ["idle", "analyzing", "success", "error"] as const;

export default function Component() {
  const [state, setState] = useState<(typeof stateOptions)[number]>("idle");

  return (
    <ViewTransition default="none">
      <form className="mx-auto my-16 max-w-lg space-y-3">
        <div className="flex gap-3">
          {stateOptions.map((option) => (
            <label
              key={option}
              className="flex gap-2 rounded-md px-2 py-1 transition-colors hover:bg-blue-600/10"
            >
              <input
                type="radio"
                name="state"
                value={option}
                checked={state === option}
                onChange={() => {
                  startTransition(() => {
                    setState(option);
                  });
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <StateBanner state={state} />
      </form>
    </ViewTransition>
  );
}

function StateBanner({
  state,
}: {
  state: (typeof stateOptions)[number];
}) {
  const iconClassName = {
    idle: "text-slate-400",
    analyzing: "text-sky-500 stroke-3 animate-spin",
    success: "text-green-500",
    error: "text-red-500",
  }[state];

  const textColorClassName = {
    idle: "text-slate-400",
    analyzing: "text-sky-500",
    success: "text-green-500",
    error: "text-red-500",
  }[state];

  const backgroundColorClassName = {
    idle: "bg-slate-100",
    analyzing: "bg-sky-100",
    success: "bg-green-100",
    error: "bg-red-100",
  }[state];

  const Icon = {
    idle: IconCircleLetterIFilled,
    analyzing: IconLoader2,
    success: IconCircleCheckFilled,
    error: IconCircleXFilled,
  }[state];

  const description = {
    idle: "Transaction Pending",
    analyzing: "Analyzing Transaction",
    success: "Transaction Safe",
    error: "Transaction Failed",
  }[state];

  return (
    <ViewTransition name="banner" default="width">
      <div
        className={cn(
          "flex w-fit items-center gap-2.5 rounded-full py-3 pr-6 pl-4",
          backgroundColorClassName,
        )}
      >
        {/* Icons */}
        <Icon className={iconClassName} />

        {/* Texts */}
        <span className={cn("font-semibold", textColorClassName)}>
          {description}
        </span>
      </div>
    </ViewTransition>
  );
}
