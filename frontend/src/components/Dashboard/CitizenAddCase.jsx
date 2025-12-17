import React, { useState } from "react";

/* ---------------- STEPS ---------------- */

const STEPS = [
  "Applicant",
  "Victim",
  "Case Details",
  "Incident",
  "Legal Preference",
  "Explanation",
  "Documents",
];
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile); // Indian mobile numbers
const isValidName = (name) => /^[A-Za-z ]+$/.test(name.trim());

export default function CaseFilingForm() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    mobile: "",
    aadhaar: "",
    victimName: "",
    relation: "",
    victimGender: "",
    victimAge: "",
    caseTitle: "",
    caseType: "",
    incidentDate: "",
    incidentPlace: "",
    urgency: "",
    specialization: "",
    courtType: "",
    background: "",
    relief: "",
    seekingNgoHelp: "",
    ngoType: "",
    documents: [],
    confirm: false,
  });
  // 🔴 ADD THIS LINE
  const [victimNameError, setVictimNameError] = useState("");
  const handle = (k, v) => setForm({ ...form, [k]: v });

  const requiredFields = {
    0: ["applicantName", "email", "mobile", "aadhaar"],
    1: ["victimName", "relation", "victimGender", "victimAge"],
    2: ["caseTitle", "caseType"],
    3: ["incidentDate", "incidentPlace", "urgency"],
    4: ["specialization", "courtType", "seekingNgoHelp"],
    5: ["background", "relief"],
    6: ["confirm"],
  };

  const validateStep = () => {
    const fields = requiredFields[step] || [];

    // Basic required check
    for (let field of fields) {
      if (!form[field]) {
        alert("Please fill all required fields.");
        return false;
      }
    }

    // STEP 0: Email & Mobile validation
    if (step === 0) {
      if (!isValidName(form.applicantName)) {
        alert("Name should contain only letters and spaces.");
        return false;
      }
      if (!isValidEmail(form.email)) {
        alert("Please enter a valid email address.");
        return false;
      }

      if (!isValidMobile(form.mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
      }
      if (form.mobile.length !== 10) {
        alert("Your number should be 10-digits only.");
        return false;
      }

      if (form.aadhaar.length !== 12) {
        alert("Aadhaar number must be exactly 12 digits.");
        return false;
      }
    }

    // STEP 4: NGO conditional validation
    if (step === 4 && form.seekingNgoHelp === "Yes" && !form.ngoType) {
      alert("Please select type of NGO.");
      return false;
    }

    return true;
  };

  const next = () => {
    if (!validateStep()) {
      alert("Please fill all required fields.");
      return;
    }
    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-[#f3f6f5] p-10">
      {/* HEADER */}
      <div className="bg-[#2f4f4f] rounded-2xl p-10 mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Add Your Case</h1>
        <p className="text-gray-200 text-lg max-w-3xl">
          Share accurate details so we can connect you with the right lawyer
          based on urgency, location, and legal requirement.
        </p>
      </div>

      {/* STEPPER */}
      <div className="flex justify-between mb-10 max-w-6xl mx-auto">
        {STEPS.map((s, i) => (
          <div key={i} className="text-center flex-1">
            <div
              className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center border-2 font-semibold ${
                i <= step
                  ? "bg-[#234f4a] border-[#234f4a] text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {i + 1}
            </div>
            <p className="mt-2 text-sm">{s}</p>
          </div>
        ))}
      </div>

      {/* FORM CARD */}
      <div className="bg-white max-w-6xl mx-auto rounded-xl shadow-xl p-10">
        {/* STEP 1 */}
        {step === 0 && (
          <Section title="Applicant Details">
            {/* INSTRUCTION */}
            <div className="md:col-span-2">
              <p className="mb-6 text-sm text-gray-600 italic">
                Please enter your personal details exactly as per official
                records. These details are used for lawyer verification and case
                communication.
              </p>
            </div>

            {/* FULL NAME */}
            <Input
              label="Full Name"
              required
              maxLength={50}
              placeholder="Example: Rahul Sharma"
              hint="According to PAN or AADHAR proof (Only alphabets and spaces are allowed.)"
              onChange={(v) =>
                handle("applicantName", v.replace(/[^A-Za-z ]/g, ""))
              }
            />

            {/* EMAIL */}
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="Example: rahul.sharma@gmail.com"
              hint="Case updates and lawyer communication will be sent to this email."
              onChange={(v) => handle("email", v)}
            />

            {/* MOBILE */}
            <Input
              label="Mobile Number"
              type="tel"
              required
              maxLength={10}
              placeholder="Example: 9876543210"
              hint="Enter a valid 10-digit mobile number without country code."
              onChange={(v) => handle("mobile", v)}
            />

            {/* AADHAAR */}
            <Input
              label="Aadhaar Number"
              type="text"
              required
              placeholder="Example: 123412341234"
              hint="Enter your 12-digit Aadhaar number (numbers only)."
              maxLength={12}
              pattern="\d{12}"
              onChange={(v) =>
                handle("aadhaar", v.replace(/\D/g, "").slice(0, 12))
              }
            />
          </Section>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <Section title="Victim Details">
            {/* INSTRUCTION */}
            <div className="md:col-span-2">
              <p className="mb-4 text-sm text-gray-600 italic">
                Enter the details of the person directly affected by the case.
                These details are important for legal assessment.
              </p>
            </div>

            {/* VICTIM NAME */}
            <Input
              label="Victim Name"
              required
              placeholder="Example: Anjali Sharma"
              hint={victimNameError || "Only alphabets and spaces are allowed."}
              error={!!victimNameError}
              onChange={(v) => {
                if (/[^A-Za-z ]/.test(v)) {
                  setVictimNameError(
                    "Victim name should contain only letters and spaces."
                  );
                } else {
                  setVictimNameError("");
                }
                handle("victimName", v.replace(/[^A-Za-z ]/g, ""));
              }}
            />

            {/* RELATION */}
            <Select
              label="Relation with Applicant"
              required
              hint="Select how the applicant is related to the victim."
              options={[
                "Self",
                "Father",
                "Mother",
                "Son",
                "Daughter",
                "Husband",
                "Wife",
                "Brother",
                "Sister",
                "Grandfather",
                "Grandmother",
                "Legal Guardian",
                "Relative",
                "Friend",
                "Other",
              ]}
              onChange={(v) => handle("relation", v)}
            />

            {/* GENDER */}
            <Select
              label="Gender"
              required
              hint="Select the gender of the victim."
              options={["Male", "Female", "Other"]}
              onChange={(v) => handle("victimGender", v)}
            />

            {/* AGE */}
            <Input
              label="Age"
              type="number"
              required
              placeholder="Example: 35"
              hint="Enter age between 1 and 100 years."
              minLength={1}
              maxLength={3}
              onChange={(v) =>
                handle(
                  "victimAge",
                  v === "not less than 1"
                    ? "not greater than 100"
                    : Math.max(3, Math.min(1, Number(v)))
                )
              }
            />
          </Section>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <Section title="Case Details">
            <Input
              label="Case Title"
              required
              onChange={(v) => handle("caseTitle", v)}
            />
            <Select
              label="Case Type"
              required
              options={["Civil", "Criminal", "Family", "Property", "Consumer"]}
              onChange={(v) => handle("caseType", v)}
            />
          </Section>
        )}

        {/* STEP 4 */}
        {step === 3 && (
          <Section title="Incident Details">
            <Input
              label="Incident Date"
              type="date"
              required
              onChange={(v) => handle("incidentDate", v)}
            />
            <Input
              label="Incident Place (City/District)"
              required
              onChange={(v) => handle("incidentPlace", v)}
            />
            <Select
              label="Urgency Level"
              required
              options={["Low", "Medium", "High"]}
              onChange={(v) => handle("urgency", v)}
            />
          </Section>
        )}

        {/* STEP 5 */}
        {step === 4 && (
          <Section title="Legal Preference">
            <Select
              label="Lawyer Specialization"
              required
              options={["Criminal", "Civil", "Family", "Property"]}
              onChange={(v) => handle("specialization", v)}
            />
            <Select
              label="Court Type"
              required
              options={["District Court", "High Court", "Supreme Court"]}
              onChange={(v) => handle("courtType", v)}
            />
            <Select
              label="Seeking Help from NGO?"
              required
              options={["Yes", "No"]}
              onChange={(v) => handle("seekingNgoHelp", v)}
            />

            {form.seekingNgoHelp === "Yes" && (
              <Select
                label="Type of NGO"
                required
                options={[
                  "Legal Aid",
                  "Women Rights",
                  "Child Protection",
                  "Senior Citizen Welfare",
                  "Human Rights",
                ]}
                onChange={(v) => handle("ngoType", v)}
              />
            )}
          </Section>
        )}

        {/* STEP 6 */}
        {step === 5 && (
          <Section title="Case Explanation">
            {/* INSTRUCTION */}
            <p className="mb-4 text-sm text-gray-600 italic">
              Please explain your case clearly and briefly. This information
              helps the lawyer understand your situation without an initial
              phone call.
            </p>

            {/* CASE BACKGROUND */}
            <div className="md:col-span-2">
              <p className="mb-2 text-sm text-[#234f4a] italic">
                <strong>Example:</strong> I purchased a flat in 2021, but the
                builder has failed to hand over possession despite multiple
                notices.
              </p>
              <Textarea
                label="Case Background"
                required
                rows={3}
                placeholder="Describe what happened, when it happened, and who is involved..."
                onChange={(v) => handle("background", v)}
              />
            </div>

            {/* RELIEF EXPECTED */}
            <div className="md:col-span-2">
              <p className="mb-2 text-sm text-[#234f4a] italic">
                <strong>Example:</strong> I am seeking compensation and
                immediate possession of the property.
              </p>
              <Textarea
                label="Relief Expected"
                required
                rows={2}
                placeholder="Mention the outcome you expect (compensation, stay order, bail, etc.)"
                onChange={(v) => handle("relief", v)}
              />
            </div>
          </Section>
        )}

        {/* STEP 7 */}
        {step === 6 && (
          <Section title="Documents & Confirmation">
            <p className="mt-4 italic text-[#234f4a] hover:underline transition-all">
              FIR Copy • Notices / Summons • Agreements / Contracts • Medical
              Reports • Photos / Videos • Court Orders (If any)
            </p>

            <input
              type="file"
              multiple
              className="w-full border border-dashed p-6 rounded-lg mb-4"
              onChange={(e) => handle("documents", [...e.target.files])}
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                required
                onChange={(e) => handle("confirm", e.target.checked)}
              />
              I confirm the above information is correct.
            </label>
          </Section>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between mt-10">
          {step > 0 && (
            <button onClick={back} className="px-8 py-3 border rounded-lg">
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="px-10 py-3 bg-[#234f4a] text-white rounded-lg"
            >
              Save & Continue →
            </button>
          ) : (
            <button className="px-10 py-3 bg-green-700 text-white rounded-lg">
              Submit Case
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="grid md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const Input = ({
  label,
  type = "text",
  required,
  placeholder,
  hint,
  onChange,
  maxLength,
  pattern,
}) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <input
      type={type}
      required={required}
      placeholder={placeholder}
      maxLength={maxLength}
      pattern={pattern}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#7fb3a2]"
    />

    {hint && <p className="mt-1 text-sm italic text-gray-500">{hint}</p>}
  </div>
);

const Select = ({ label, options, required, onChange }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-lg"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, required, onChange, rows = 3, placeholder }) => (
  <div className="md:col-span-2">
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <textarea
      rows={rows}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#7fb3a2]"
    />
  </div>
);
