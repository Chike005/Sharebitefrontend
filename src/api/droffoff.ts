import { API_ENDPOINTS } from 'helpers/constant';
import { axiosInstance, handleAxiosError } from './config';

class DroffSiteApiRequest {
  static getAllSites = async () => {
    try {
      const response = await axiosInstance.get(
        `/${API_ENDPOINTS.droffsites.getAllSites()}`,
      );
      return { locations: response.data };
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static addSite = async (credential: {
    location: string;
    added_by: number;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/${API_ENDPOINTS.droffsites.addSite()}`,
        credential,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  static getCollectionPoints = async () => {
    try {
      const response = await axiosInstance.get<CollectionPoint[]>(
        `/${API_ENDPOINTS.collectionPoints.list()}`,
      );
      return { collectionPoints: response.data };
    } catch (error) {
      handleAxiosError(error);
    };
  };
}

export default DroffSiteApiRequest;
