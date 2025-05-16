import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllJobsApi } from "../services/JobSrevice";
import ApplyForm from "./ApplyForm";
import { GetUserApplicationsApi } from "../services/StudentService";

const StudentTab = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [searchTerm, setSearchTerm] = useState("");
  const [availableJobs, setAvailableJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetchJobsForTab(activeTab);
  }, [activeTab]);

  const fetchJobsForTab = async (tab) => {
    setLoading(true);
    try {
      if (tab === "available") {
        const res = await getAllJobsApi();
        setAvailableJobs(res.data || []);
      } else if (tab === "applied") {
        const res = await GetUserApplicationsApi();
        // Flatten each wrapper to its .job object
        const jobsOnly = (res.data || []).map((wrapper) => ({
          ...wrapper.job,
          _applicationId: wrapper._id,
          appliedAt: wrapper.appliedAt,
        }));
        setAppliedJobs(jobsOnly);
      }
    } catch (error) {
      console.error(`Failed to fetch ${tab} jobs:`, error);
      if (tab === "available") setAvailableJobs([]);
      else if (tab === "applied") setAppliedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const openApplyForm = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyForm(true);
  };

  const closeApplyForm = () => {
    setSelectedJobId(null);
    setShowApplyForm(false);
  };

  const filterJobs = (jobs) =>
    jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // pick the correct list per tab
  const jobsToDisplay =
    activeTab === "available"
      ? filterJobs(availableJobs)
      : filterJobs(appliedJobs);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Search */}
      <motion.div
        className="container mx-auto px-6 mb-8 mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search for jobs, skills, or companies..."
          className="w-full p-4 text-lg rounded-lg border border-input shadow-sm focus:ring-ring focus:ring-2 bg-card text-card-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="container mx-auto px-6 flex space-x-4 mb-8 border-b border-border pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["available", "applied"].map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Jobs
          </div>
        ))}
      </motion.div>

      {/* Job List */}
      <motion.div
        className="container mx-auto px-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            Loading jobs...
          </div>
        ) : jobsToDisplay.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            {activeTab === "available"
              ? "No jobs available at the moment."
              : "You haven’t applied to any jobs yet."}
          </div>
        ) : (
          jobsToDisplay.map((job, idx) => (
            <motion.div
              key={job._id || job.id}
              className="p-6 rounded-lg shadow hover:shadow-lg bg-card text-card-foreground transition-transform duration-200"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
            >
              <h2 className="text-2xl font-semibold mb-1">{job.title}</h2>
              <h3 className="text-primary text-lg mb-2">{job.company}</h3>
              <div className="flex items-center text-muted-foreground text-sm mb-4">
                <span>{job.location}</span>
                <span className="mx-2">•</span>
                <span>{job.salary}</span>
              </div>
              <p className="mb-4 leading-relaxed">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(job.requirements)
                  ? job.requirements
                  : [job.requirements]
                )
                  .flatMap((r) => r.split(","))
                  .map((r) => r.trim())
                  .filter(Boolean)
                  .map((r, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {r}
                    </span>
                  ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Posted{" "}
                  {job.postedDate
                    ? job.postedDate
                    : new Date(job.createdAt).toLocaleDateString()}
                </span>
                {activeTab === "available" && (
                  <motion.button
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openApplyForm(job._id)}
                  >
                    Apply Now
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Apply Form Modal */}
      {showApplyForm && selectedJobId && (
        <ApplyForm jobId={selectedJobId} onClose={closeApplyForm} />
      )}
    </div>
  );
};

export default StudentTab;
