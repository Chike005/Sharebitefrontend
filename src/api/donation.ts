import { API_ENDPOINTS } from 'helpers/constant';
import { axiosInstance, handleAxiosError } from './config';

// ✅ Use global MakeDonation type
type MakeDonation = globalThis.MakeDonation;

class DonationApiRequest {
  static getAllDonations = async (status?: string) => {
    try {
      const response = await axiosInstance.get(
        `/${API_ENDPOINTS.donation.donations()}`
      );
      const donations: Donation[] = response.data;

      if (status) {
        const filteredDonations = donations.filter(
          (donation) =>
            status === 'All' ||
            donation.status.toUpperCase() === status.toUpperCase()
        );
        return { donations: filteredDonations };
      }

      return { donations };
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static getUserDonations = async (status: string) => {
    try {
      const response = await axiosInstance.get(
        `/${API_ENDPOINTS.donation.userdonations()}`
      );
      const donations: Donation[] = response.data;

      if (status) {
        const filteredDonations = donations.filter(
          (donation) =>
            status === 'All' ||
            donation.status.toUpperCase() === status.toUpperCase()
        );
        return { cdonations: filteredDonations };
      }

      return { cdonations: donations };
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static makeDonation = async (
    credentials: MakeDonation & { food_image?: File }
  ): Promise<unknown> => {
    try {
      const formData = new FormData();
      Object.entries(credentials).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });
      const response = await axiosInstance.post<unknown>(
        `/${API_ENDPOINTS.donation.donations()}`,
        formData
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static updateDonationStatus = async ({
    status,
    donation_id,
  }: {
    status: string;
    donation_id: number;
  }) => {
    try {
      const response = await axiosInstance.put(
        `/${API_ENDPOINTS.donation.updatestatus(donation_id)}`,
        { status }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static confirmCollectionPointReceipt = async (donation_id: number) => {
    try {
      const response = await axiosInstance.post(
        `/${API_ENDPOINTS.donation.confirmReceipt(donation_id)}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static reserveDonation = async (donation_id: number) => {
    try {
      const response = await axiosInstance.post(
        `/${API_ENDPOINTS.donation.reserve(donation_id)}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static cancelDonation = async (donation_id: number) => {
    try {
      const response = await axiosInstance.post(
        `/${API_ENDPOINTS.donation.cancelDonation(donation_id)}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static getReciepts = async () => {
    try {
      const response = await axiosInstance.get(
        `/${API_ENDPOINTS.donation.receipts()}`
      );
      return { receipts: response.data };
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static getReservations = async () => {
    try {
      const response = await axiosInstance.get(
        `/${API_ENDPOINTS.donation.reservations()}`
      );
      return { reservations: response.data };
    } catch (error) {
      handleAxiosError(error);
    }
  };
}

export default DonationApiRequest;
