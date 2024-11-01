import React from 'react';

function Terms() {
  return (
    <div className="bg-[#121212] text-white min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-6 text-gray-400">
        Welcome to our website. By browsing and using this website, you agree to comply with and be bound by the
        following terms and conditions, which, together with our privacy policy, govern [Your Company Name]'s
        relationship with you in relation to this website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Use of the Website</h2>
      <p className="mb-4">
        The content on this website is for general information and use only. It is subject to change without notice.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Privacy</h2>
      <p className="mb-4">
        Any information or materials you use on this website are entirely at your own risk. It is your responsibility to
        ensure that any products, services, or information available through this website meet your specific
        requirements.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Governing Law</h2>
      <p className="mb-4">
        Your use of this website and any disputes arising out of such use are subject to the laws of [Your Country].
      </p>
    </div>
  );
}

export default Terms;
