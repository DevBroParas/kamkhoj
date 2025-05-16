import React, { useState } from 'react';
import { ApplyToJobApi } from '../services/StudentService';

const ApplyForm = ({ jobId, onClose }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !coverLetter) return alert("Please upload both files!");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      setLoading(true);
      await ApplyToJobApi(jobId, formData);
      alert("Applied successfully! ✅");
      onClose(); // close modal
    } catch (err) {
      console.error("Apply error:", err);
      alert("Application failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-card p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Apply to this Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Resume (PDF)</label>
            <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Cover Letter (PDF)</label>
            <input type="file" accept="application/pdf" onChange={(e) => setCoverLetter(e.target.files[0])} required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-muted text-foreground rounded-md">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
