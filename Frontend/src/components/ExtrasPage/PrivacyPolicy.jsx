import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="bg-[#121212] text-white min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 text-gray-400">Last updated: October 2023</p>
      <p className="mb-4">
        Welcome to our Privacy Policy page! When you use our web services, you trust us with your information. This
        Privacy Policy is meant to help you understand what data we collect, why we collect it, and what we do with it.
        This is important; we hope you will take time to read it carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect information to provide better services to all our users. We collect information in the following
        ways:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Information you give us, such as signing up for an account and providing personal details.</li>
        <li>Information from your use of our services, like site visits or interactions with ads.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">How We Use Information We Collect</h2>
      <p className="mb-4">
        We use the information collected from our services to maintain, improve, and personalize them, including
        delivering relevant content and ads.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Information We Share</h2>
      <p className="mb-4">
        We do not share personal information outside of our company unless in the following cases:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>With your consent, where needed.</li>
        <li>For legal reasons, if necessary to comply with laws and regulations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Information Security</h2>
      <p className="mb-4">
        We protect user data from unauthorized access by using measures such as SSL encryption, two-step verification,
        and regular reviews of our practices.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Changes</h2>
      <p className="mb-4">
        Our Privacy Policy may change over time. We will not reduce your rights without explicit consent and will
        notify you of significant updates.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
