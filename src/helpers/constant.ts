export const API_ENDPOINTS = {
  auth: {
    login: () => 'login/',
    signup: () => 'register/',
    editprofile: () => 'edituser/',
    resetpassword: () => 'resetpassword/',
  },
  donation: {
    donations: () => 'donations/',
    updatestatus: (pk: number) => `donations/${pk}/status/`,
    confirmReceipt: (pk: number) => `donations/${pk}/confirm-receipt/`,
    userdonations: () => 'donations/mine/',
    getDonationDetails: (donation_id: number) => `donations/${donation_id}/`,
    uploadProofs: (donation_id: number) => `donations/${donation_id}/proof/`,
    reserve: (donation_id: number) => `donations/${donation_id}/reserve/`,
    cancelDonation: (donation_id: number) => `donations/${donation_id}/cancel/`,
    receipts: () => 'receipts/',
    uploadReceipt: (donation_id: number) => `donations/${donation_id}/receipt/`,
    reservations: () => 'donations/reserved/',
  },
  droffsites: {
    getAllSites: () => 'dropoff-sites/',
    addSite: () => 'dropoff-sites/',
  },
  collectionPoints: {
    list: () => 'collection-points/',
  },
  users: {
    members: () => 'members/',
  },
};
