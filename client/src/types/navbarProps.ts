import Profile_interface from "./profile_interface";

export default interface navbarProps {
    isLogged: boolean;
    profile: Profile_interface | undefined;
    siteName: string;
    onLogout: () => void;
}