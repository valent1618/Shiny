export default function FormatJob(job) {
  job = job.split(' ')
  if (job.length > 1) {
    return job[1].toUpperCase()
  } else {
    return job[0].toUpperCase()
  }
}
