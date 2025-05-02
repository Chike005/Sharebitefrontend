declare global {
  interface PieChartDataType {
    name: string;
    color: string;
    value: number;
  }
  interface DonationPieChartProps {
    data: PieChartDataType[];
    titleheader: string;
    titleLenght: number;
    centerTitle: string;
  }
  interface LoginFormData {
    username: string;
    password: string;
  }

  interface SignupFormData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmpassword: string;
    is_donor: boolean | string;
    is_receiver: boolean | string;
    role?: string;
  }

  interface EditProfileFormData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  }

  interface MakeDonation {
    title: string;
    description: string;
    location: string;
    donor?: number;
    quantity: string;
    expiry_date: string;
    latitude?: number;
    longitude?: number;
    donor_id?: number;
  }

  interface User {
    token?: string;
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_donor: boolean;
    is_receiver: boolean;
  }

  interface Donation {
    id: number;
    donor: User;
    title: string;
    status: string;
    description: string;
    location: string;
    is_reserved: boolean;
    is_delivered: boolean;
    created_at: string | Date;
    reserved_by: User | null;
    proof?: Proof;
    receipt?: Reciept;
    latitude?: number;
    longitude?: number;
    quantity: string;
  }

  interface ReDonation {
    id: number;
    donor: User;
    title: string;
    description: string;
    location: string;
    is_reserved: boolean;
    is_delivered: boolean;
    created_at: string | Date;
    reserved_by: User | null;
    proof?: Proof;
    receipt?: Reciept2;
    latitude?: number;
    longitude?: number;
    quantity: string;
  }

  interface Proof {
    id: number;
    donation: Donation;
    proof_image: string;
    uploaded_by: User;
  }

  interface Reciept2 {
    id: number;
    proof_image: string;
    pickup_date: string;
    created_at: string;
  }

  interface Reciept {
    id: number;
    donation: Donation;
    proof_image: string;
    user: User;
    pickup_date: string;
    created_at: string;
  }

  interface DroffSite {
    id: string;
    location: string;
    added_by: User;
    created_at: string;
    latitude: number;
    longitude: number;
    status: string;
  }

  // Props
  interface NoDataProps {
    title: string;
    description: string;
  }

  interface MemeberDesProps {
    iconName?: string;
    iconTitle: string;
    IconNumber: number;
    iconColor: string;
    iconBgColor: string;
  }

  interface FilterDataType {
    id: number;
    title: string;
  }

  interface MakeDonationProps {
    onClose: () => void;
  }

  interface ImageUploadProps {
    onImageUpload?: (logoUrl: string) => void;
    id: number;
    userid: number;
    mode: string;
  }

  interface DonationProofUploadProps {
    onClose: () => void;
    donation: Donation;
    mode: string;
  }

  interface ReceiptProps {
    onClose: () => void;
    donation: Donation;
  }

  interface DonationViewProps {
    onClose: () => void;
    donation: Donation;
    mode: string;
  }
  interface DetailsProps {
    titleRight: string;
    titleLeft: string;
    labelRight: string;
    labelLeft: string;
  }

  // context
  type UserContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isDonor: () => boolean;
    isReceiver: () => boolean;
  };

  type ContextProps = {
    children: React.ReactNode;
  };

  interface ProtectedRouteProps {
    children: React.ReactNode;
    // path: string;
    // exact?: boolean;
  }

  interface DonationContextType {
    donations: Donation[];
    locations: DroffSite[];
    users: User[];
    currentUserDonations: Donation[];
    reservations: Donation[];
    donationLoading: boolean;
    locationLoading: boolean;
    userLoading: boolean;
    reservationLoading: boolean;
    currentUserDonationLoading: boolean;
    donationError: Error | null;
    locationError: Error | null;
    userError: Error | null;
    currentUserDonationError: Error | null;
    reservationError: Error | null;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    cstatus: string;
    setCstatus: React.Dispatch<React.SetStateAction<string>>;
  }
}

export {};
