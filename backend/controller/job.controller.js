import Job from "../models/job.model.js";

export const CreateJob = async (req, res, next) => {
  const { title, description, requirements, location, salary, company } =
    req.body;

  if (
    !title ||
    !description ||
    !requirements ||
    !location ||
    !salary ||
    !company
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = await Job.create({
      title,
      description,
      requirements,
      location,
      salary,
      company,
      createdBy: req.user.id,
    });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const GetAllUserJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const GetAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const GetSingleJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const UpdateJob = async (req, res, next) => {
  const { jobId } = req.params;
  const { title, description, requirements, location, salary, company } =
    req.body;
  try {
    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements,
        location,
        salary,
        company,
      },
      { new: true }
    );
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const DeleteJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};
