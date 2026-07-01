// Components
import Support from "../../../components/support";

export const metadata = {
  title: "Terms & Conditions | PermisGo",
  description:
    "Read the Terms and Conditions for using PermisGo services, including account use, bookings, payments, responsibilities, and platform rules.",
};

const TermsAndConditions = () => {
  return (
    <Support
      title="Terms & Conditions"
      headPara="Please read these Terms and Conditions carefully before using PermisGo services. By accessing our platform, you agree to follow these terms."
      mainContent={`These Terms and Conditions explain the rules for using PermisGo, including access to our website, driving lesson services, booking features, partner services, payment options, and related platform tools.

By using PermisGo, you agree to provide accurate information when creating an account, booking lessons, contacting instructors, or submitting any forms through the platform. You are responsible for keeping your login details secure and for all activity that takes place under your account.

PermisGo helps connect learners, driving schools, instructors, and related service providers. While we aim to provide accurate information and a smooth user experience, lesson availability, prices, schedules, instructor assignment, and service coverage may vary depending on location and partner availability.

All bookings, payments, cancellations, and refunds must follow the conditions shown at the time of booking or agreed with the relevant service provider. Users must attend lessons on time, respect instructors and partner schools, and comply with applicable road safety rules and legal driving requirements.

You must not misuse the platform, submit false information, attempt unauthorized access, copy platform content without permission, or use PermisGo services for unlawful or harmful purposes.

PermisGo may update these Terms and Conditions when needed to reflect changes in services, legal requirements, or business operations. Continued use of the platform after updates means you accept the revised terms.

For questions about these Terms and Conditions, please contact the PermisGo support team.`}
    />
  );
};

export default TermsAndConditions;
