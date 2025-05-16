import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  createJobApi,
  getMyJobsApi,
  updateJobApi,
  deleteJobApi,
} from "../services/JobSrevice";
import { GetApplicantsForJobApi } from "../services/StudentService";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  const makeFileUrl = (raw) => {
    if (!raw) return null;
    const normalized = raw.replace(/\\/g, "/");
    const pathPart = normalized.startsWith("/uploads/")
      ? normalized
      : `/${normalized}`;
    return `${BACKEND_URL}${pathPart}`;
  };

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
      if (isEditing && editJobId) {
        await updateJobApi(editJobId, jobForm);
        alert("Job updated!");
      } else {
        await createJobApi(jobForm);
        alert("Job created!");
      }

      setJobForm({
        company: "",
        title: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
      });
      setIsEditing(false);
      setEditJobId(null);
      await fetchMyJobs();
      setActiveTab("dashboard");
    } catch (e) {
      console.error(e);
      alert("Failed to submit job");
    }
  };

  const handleEditClick = (job) => {
    setJobForm({ ...job, requirements: job.requirements.join(", ") });
    setIsEditing(true);
    setEditJobId(job._id);
    setActiveTab("postjob");
  };

  const handleDeleteClick = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJobApi(jobId);
      alert("Job deleted");
      fetchMyJobs();
    } catch (e) {
      console.error("Failed to delete job", e);
      alert("Could not delete job");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

return (
  <div className="container mx-auto p-6 max-w-5xl mt-20 text-zinc-900 dark:text-zinc-100">
    <nav className="mb-10 border-b border-zinc-300 dark:border-zinc-700">
      <ul className="flex space-x-6 text-lg font-semibold">
        {["dashboard", "postjob", "applicants"].map((tab) => (
          <li
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`cursor-pointer pb-3 transition-all ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {tab === "postjob"
              ? "Post a Job"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
      {/* DASHBOARD */}
      {activeTab === "dashboard" && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          {jobs.length === 0 ? (
            <p className="text-muted-foreground">No jobs posted yet.</p>
          ) : (
            <ul className="space-y-6">
              {jobs.map((j) => (
                <li key={j._id} className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 shadow-sm bg-white dark:bg-zinc-900 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-xl">{j.title}</h3>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleEditClick(j)}
                        className="text-blue-600 hover:underline transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(j._id)}
                        className="text-red-600 hover:underline transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mb-2">{j.description}</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>📍 {j.location} • ₹{j.salary}</p>
                    <p>🏢 Company: {j.company}</p>
                    <p>🛠 Skills: {Array.isArray(j.requirements) ? j.requirements.join(", ") : j.requirements}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* POST JOB */}
      {activeTab === "postjob" && (
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? "Edit Job" : "Post a New Job"}
          </h2>
          <form onSubmit={handleJobSubmit} className="space-y-5 max-w-lg">
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
                className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800"
              />
            </div>

            {[
              { id: "title", label: "Job Title" },
              { id: "location", label: "Location" },
              { id: "salary", label: "Salary Range" },
              { id: "requirements", label: "Required Skills (comma separated)" },
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
                  className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800"
                />
              </div>
            ))}

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={jobForm.description}
                onChange={handleJobInputChange}
                required
                rows={4}
                className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              {isEditing ? "Update Job" : "Post Job"}
            </button>
          </form>
        </section>
      )}

      {/* APPLICANTS */}
      {activeTab === "applicants" && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Applicants</h2>
          {applicants.length === 0 ? (
            <p className="text-muted-foreground">No applicants yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow border border-zinc-200 dark:border-zinc-700">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
                    {["Name", "Email", "Applied For", "Resume", "Cover Letter"].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-sm border-b border-zinc-300 dark:border-zinc-700">
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
                      <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">{a.applicant.name}</td>
                        <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">{a.applicant.email}</td>
                        <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">{a.jobTitle}</td>
                        <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                          {resumeUrl ? (
                            <button
                              onClick={() => downloadFile(resumeUrl, "resume.pdf")}
                              className="text-blue-600 hover:underline"
                            >
                              Download
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                          {coverUrl ? (
                            <button
                              onClick={() => downloadFile(coverUrl, "coverLetter.pdf")}
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
            </div>
          )}
        </section>
      )}
    </motion.div>
  </div>
);

};

export default RecruterTab;
