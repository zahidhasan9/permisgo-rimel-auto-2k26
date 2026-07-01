import Support from "../../../components/support";

export const metadata = {
  title: "Privacy and Cookies | PermisGo",
  description:
    "Read PermisGo's privacy and cookies policy to understand how we collect, use, and protect your personal information.",
};

const PrivacyPolicy = () => {
  return (
    <Support
      title="Privacy and Cookies"
      headPara="Your privacy is important to us. This policy explains how PermisGo collects, uses, and protects your personal information."
      mainContent="PermisGo is committed to protecting your privacy and ensuring transparency in how your personal information is collected, used, stored, and protected. When you use our platform, we may collect information such as your name, email address, phone number, location, account details, booking information, and payment-related data necessary to provide our driving school services.

We use this information to manage your account, process bookings, improve our services, provide customer support, personalize your experience, and communicate important updates. We do not sell your personal data to third parties.

PermisGo may use cookies and similar technologies to improve website performance, remember user preferences, analyze traffic, and enhance your browsing experience. You can manage or disable cookies through your browser settings, although some features of the website may not function properly without them.

Your personal information is stored securely and only accessed by authorized personnel when necessary. We take reasonable technical and organizational measures to protect your data against unauthorized access, loss, misuse, or disclosure.

You have the right to request access to your personal data, ask for corrections, request deletion where applicable, or withdraw consent for certain types of data processing. For any privacy-related questions or requests, please contact the PermisGo support team."
    />
  );
};

export default PrivacyPolicy;
