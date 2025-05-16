import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createJobApi, getMyJobsApi } from "../services/JobSrevice";
import { GetApplicantsForJobApi } from "../services/StudentService";

// Change this to match your Express host/port
const BACKEND_URL = "http://localhost:8080";

const tabVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const RecruterTab = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [jobForm, setJobForm] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  // Build the correct URL for an uploaded file
  const makeFileUrl = (raw) => {
    if (!raw) return null;
    const normalized = raw.replace(/\\/g, "/");
    const pathPart = normalized.startsWith("/uploads/")
      ? normalized
      : `/${normalized}`;
    return `${BACKEND_URL}${pathPart}`;
  };

  // Download via fetch+blob so credentials are included
  const downloadFile = async (url, filename) => {
    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error("Download failed", e);
      alert("Failed to download file");
    }
  };

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    if (tab === "dashboard") await fetchMyJobs();
    if (tab === "applicants") await fetchApplicants();
  };

  const fetchMyJobs = async () => {
    try {
      const { data } = await getMyJobsApi();
      setJobs(data || []);
    } catch (e) {
      console.error("Failed to fetch jobs", e);
    }
  };

  const fetchApplicants = async () => {
    try {
      const { data: jobList } = await getMyJobsApi();
      const allApps = [];
      for (const job of jobList || []) {
        try {
          const { data } = await GetApplicantsForJobApi(job._id);
          data.forEach((app) =>
            allApps.push({ ...app, jobTitle: job.title })
          );
        } catch {
          console.warn(`Failed applicants for job ${job._id}`);
        }
      }
      setApplicants(allApps);
    } catch (e) {
      console.error("Failed to load applicants", e);
    }
  };

  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJobApi(jobForm);
      alert("Job created!");
      setJobForm({
        company: "",
        title: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
      });
      await fetchMyJobs();
      setActiveTab("dashboard");
    } catch (e) {
      console.error(e);
      alert("Failed to create job");
    }
  };

  // On first mount load dashboard
  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-5xl mt-20 text-zinc-900 dark:text-zinc-100">
      <nav className="mb-6 border-b border-zinc-300 dark:border-zinc-700">
        <ul className="flex space-x-6 text-lg font-semibold">
          {["dashboard", "postjob", "applicants"].map((tab) => (
            <li
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`cursor-pointer pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {tab
                .charAt(0)
                .toUpperCase() +
                tab
                  .slice(1)
                  .replace("postjob", "Post a Job")
                  .replace("applicants", "Applicants")}
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        key={activeTab}
        variants={tabVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            {jobs.length === 0 ? (
              <p className="text-muted-foreground">No jobs posted yet.</p>
            ) : (
              <ul className="space-y-4">
                {jobs.map((j) => (
                  <li key={j._id} className="border rounded p-4">
                    <h3 className="font-semibold text-xl">{j.title}</h3>
                    <p>{j.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {j.location} • ₹{j.salary}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Company: {j.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Skills: {j.requirements.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Post Job */}
        {activeTab === "postjob" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
            <form onSubmit={handleJobSubmit} className="space-y-4 max-w-lg">
              {/* Company Name Input */}
              <div>
                <label htmlFor="company" className="block font-medium mb-1">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={jobForm.company}
                  onChange={handleJobInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Other Job Fields */}
              {[
                { id: "title", label: "Job Title" },
                { id: "location", label: "Location" },
                { id: "salary", label: "Salary Range" },
                { id: "requirements", label: "Required Skills" },
              ].map(({ id, label }) => (
                <div key={id}>
                  <label htmlFor={id} className="block font-medium mb-1">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type="text"
                    value={jobForm[id]}
                    onChange={handleJobInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="description"
                  className="block font-medium mb-1"
                >
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={jobForm.description}
                  onChange={handleJobInputChange}
                  required
                  rows={4}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button className="bg-primary text-primary-foreground px-5 py-2 rounded">
                Post Job
              </button>
            </form>
          </section>
        )}

        {/* Applicants */}
        {activeTab === "applicants" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Applicants</h2>
            {applicants.length === 0 ? (
              <p className="text-muted-foreground">No applicants yet.</p>
            ) : (
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    {[
                      "Name",
                      "Email",
                      "Applied For",
                      "Resume",
                      "Cover Letter",
                    ].map((h) => (
                      <th
                        key={h}
                        className="border px-4 py-2 text-left"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((a, i) => {
                    const resumeUrl = makeFileUrl(a.resume);
                    const coverUrl = makeFileUrl(a.coverLetter);
                    return (
                      <tr
                        key={i}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      >
                        <td className="border px-4 py-2">
                          {a.applicant.name}
                        </td>
                        <td className="border px-4 py-2">
                          {a.applicant.email}
                        </td>
                        <td className="border px-4 py-2">
                          {a.jobTitle}
                        </td>
                        <td className="border px-4 py-2">
                          {resumeUrl ? (
                            <button
                              onClick={() =>
                                downloadFile(resumeUrl, "resume.pdf")
                              }
                              className="text-blue-600 hover:underline"
                            >
                              Download
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {coverUrl ? (
                            <button
                              onClick={() =>
                                downloadFile(coverUrl, "coverLetter.pdf")
                              }
                              className="text-blue-600 hover:underline"
                            >
                              Download
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        )}
      </motion.div>
    </div>
  );
};

export default RecruterTab;
