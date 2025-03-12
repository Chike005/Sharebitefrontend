export const rootPaths = {
  root: '/',
  pageRoots: '/',
  authRoot: '/',
  errorRoot: '/error',
};

const paths = {
  default: `${rootPaths.root}`,
  login: `${rootPaths.authRoot}login`,
  signup: `${rootPaths.authRoot}sign-up`,
  notfound: `${rootPaths.errorRoot}/404`,

  home: `${rootPaths.pageRoots}home`,

  dashboard: `${rootPaths.pageRoots}dashboard`,
  donations: `${rootPaths.pageRoots}donations`,
  donors: `${rootPaths.pageRoots}donors`,
  receivers: `${rootPaths.pageRoots}receivers`,
  droffsites: `${rootPaths.pageRoots}droffsites`,

  donordashboard: `${rootPaths.pageRoots}donor`,
  history: `${rootPaths.pageRoots}history`,

  recieverdashboard: `${rootPaths.pageRoots}reciever`,
  receipt: `${rootPaths.pageRoots}reciepts`,
  reservations: `${rootPaths.pageRoots}reservations`,

  profile: `${rootPaths.pageRoots}profile`,
};

export default paths;
