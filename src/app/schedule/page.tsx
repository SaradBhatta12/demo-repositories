"use client";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";

interface Schedule {
  title: string;
  description: string;
  date: string;
  location: string;
  startTime: string;
  endTime: string;
  teacher: {
    name: string;
  };
  course: {
    name: string;
  };
}

const Page = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const tableRef = useRef<HTMLDivElement>(null);

  const getAllData = async () => {
    const response = await axios.get("/api/admin/schedule");
    setSchedules(response.data.schedules);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const generatePDF = async () => {
    const element = tableRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("schedule.pdf");
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div ref={tableRef} className="overflow-x-auto">
        <table className="min-w-full  border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Start Time</th>
              <th className="px-4 py-3 text-left">End Time</th>
              <th className="px-4 py-3 text-left">Teacher</th>
              <th className="px-4 py-3 text-left">Course</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-slate-900"
              >
                <td className="px-4 py-3">{schedule.title}</td>
                <td className="px-4 py-3">{schedule.description}</td>
                <td className="px-4 py-3">{schedule.date.substring(0, 10)}</td>
                <td className="px-4 py-3">{schedule.location}</td>
                <td className="px-4 py-3">{schedule.startTime}</td>
                <td className="px-4 py-3">{schedule.endTime}</td>
                <td className="px-4 py-3">{schedule.teacher.name}</td>
                <td className="px-4 py-3">{schedule.course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default Page;
