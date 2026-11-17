import { useQuery } from '@tanstack/react-query';
import DonationApiRequest from 'api/donation';
import { createContext, useContext, useState } from 'react';
import { useUser } from './userContext';
import DroffSiteApiRequest from 'api/droffoff';
import ApiRequests from 'api';

const DonationContext = createContext<DonationContextType | undefined>(
  undefined,
);

export const useDonation = () => {
  const context = useContext(DonationContext);

  if (context === undefined) {
    throw new Error('useDonation must be with a provider');
  }

  return context;
};

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [cstatus, setCstatus] = useState('All');
  const { user } = useUser();

  const {
    data: donationData,
    isLoading: donationLoading,
    error: donationError,
  } = useQuery({
    queryKey: [
      'donations',
      user?.is_staff ? 'all' : 'available',
      statusFilter,
    ],
    queryFn: () =>
      user?.is_staff
        ? DonationApiRequest.getAllDonations(statusFilter)
        : DonationApiRequest.getAvailableDonations(statusFilter),
    enabled: !!user && (user.is_staff || user.is_receiver),
  });

  const donations = donationData?.donations || [];

  const {
    data: locationsData,
    isLoading: locationLoading,
    error: locationError,
  } = useQuery({
    queryKey: ['collection-points'],
    queryFn: () => DroffSiteApiRequest.getCollectionPoints(),
    enabled: !!user?.is_staff,
  });

  const locations = locationsData?.collectionPoints || [];

  const {
    data: usersData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => ApiRequests.getMembers(),
    enabled: !!user?.is_staff,
  });

  const users = usersData?.users || [];

  const {
    data: currentUserData,
    isLoading: currentUserDonationLoading,
    error: currentUserDonationError,
  } = useQuery({
    queryKey: ['cdonation', cstatus],
    queryFn: () => DonationApiRequest.getUserDonations(cstatus),
    enabled: !!user && !!user.is_donor,
  });

  const currentUserDonations = currentUserData?.cdonations || [];

  const {
    data: reserveData,
    isLoading: reservationLoading,
    error: reservationError,
  } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => DonationApiRequest.getReservations(),
    enabled: !!user && !!user.is_receiver,
  });

  const reservations = reserveData?.reservations || [];

  return (
    <DonationContext.Provider
      value={{
        donations,
        locations,
        users,
        currentUserDonations,
        reservations,
        donationLoading,
        locationLoading,
        userLoading,
        currentUserDonationLoading,
        reservationLoading,
        donationError,
        locationError,
        userError,
        reservationError,
        currentUserDonationError,
        statusFilter,
        setStatusFilter,
        cstatus,
        setCstatus,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
