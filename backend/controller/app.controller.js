import Application from "../models/application.model.js";

export const ApplyToJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const resume = req.files.resume?.[0]?.path;
    const coverLetter = req.files.coverLetter?.[0]?.path;

    if (!resume || !coverLetter) {
      return res
        .status(400)
        .json({ message: "Resume and cover letter required." });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetUserApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      applicant: req.user.id,
    }).populate("job");
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetApplicantsForJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email") // Only name & email
      .populate("job", "title company"); // Optional: just some job fields

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};
