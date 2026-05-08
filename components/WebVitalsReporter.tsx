"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.info("[web-vitals]", metric.name, metric.value, metric.rating);
    }
  });

  return null;
}
