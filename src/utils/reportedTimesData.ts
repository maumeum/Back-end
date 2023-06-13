interface ReportUserData {
  reportedTimes: number;
  role: string;
}

const countReportedTimes = (reportUserData: ReportUserData) => {
  const reportedTimes = reportUserData.reportedTimes + 1;
  const role = reportUserData.role;

  if (reportedTimes >= 5) {
    return { reportedTimes: reportedTimes, role: 'disabled' };
  } else {
    return { reportedTimes: reportedTimes, role: role };
  }
};

export { countReportedTimes };
