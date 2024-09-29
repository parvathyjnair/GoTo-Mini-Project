import { CredentialResponse } from "@react-oauth/google";

export default interface loginPageProps {
    handleLoginSuccess: (credentialResponse:CredentialResponse)=>Promise<void>;
}